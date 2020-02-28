import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {MatDialog} from '@angular/material/dialog';
import {EventDialogComponent} from '../event-dialog/event-dialog.component';

import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import * as moment from 'moment';

const removeBackgroundColor = '#ffe6e2';
const validateBackgroundColor = '#fff9dd';
const validIcon = '/assets/img/002-check.svg';
const removeIcon = '/assets/img/001-remove.svg';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar', {read: undefined, static: false}) calendarComponent: FullCalendarComponent;

  private minTime = '07:00:00';
  private maxTime = '22:00:00';
  private calendarVisible = true;
  private calendarWeekends = true;
  private edit = true;
  private calendarEvents: EventInput[];

  private calendarPlugins = [dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrapPlugin];

  constructor(public dialog: MatDialog) {
    this.calendarEvents = [{
      id: 1,
      resourceId: 1,
      title: 'Mon event',
      start: moment('2020-02-12 08:00:00').format(),
      end: moment('2020-02-12 10:00:00').format()
    }];
  }

  ngOnInit() {}

  private addRemoveBtn(info) {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = 'X';
    spanElement.classList.add('calendar-remove-btn');
    spanElement.addEventListener('click', () => info.event.remove());
    info.el.appendChild(spanElement);
  }

  private render(info) {
    if (this.edit) {
      this.addRemoveBtn(info);
    } else {
      info.el.classList.add('calendar-icon-container');
      info.el.innerHTML = '<img src="' +
        (info.event.backgroundColor === removeBackgroundColor ? removeIcon : validIcon)
        + '" alt="icon" class="calendar-icon"/>';
    }
  }

  private onMouseEnter(info) {
    if (this.edit) {
      const spanElement = info.el.lastChild as HTMLElement;
      spanElement.classList.add('calendar-remove-btn-display');
    }
  }

  private onEventClick(info) {
    if (!this.edit) {
      if (info.event.backgroundColor === removeBackgroundColor) {
        this.calendarEvents.find(e => e.id == info.event.id).backgroundColor = validateBackgroundColor;
      } else {
        this.calendarEvents.find(e => e.id == info.event.id).backgroundColor = removeBackgroundColor;
      }
      this.refreshCalendar();
    }
  }

  private onMouseLeave(info) {
    if (this.edit) {
      const spanElement = info.el.lastChild as HTMLElement;
      spanElement.classList.remove('calendar-remove-btn-display');
    }
  }

  private eventUpdate(eventDropInfo) {
    const event = this.calendarEvents.find(e => e.id == eventDropInfo.event.id);
    event.start = moment(eventDropInfo.event.start).format();
    event.end = moment(eventDropInfo.event.end).format();
    this.refreshCalendar();
  }

  private refreshCalendar() {
    this.calendarComponent.getApi().removeAllEventSources();
    this.calendarComponent.getApi().addEventSource(this.calendarEvents);
  }

  private handleDateClick(arg) {
    this.openNewEventDialog(arg, false);
  }

  private handleDateSelection(arg) {
          // Todo supprimer le mode selection
    this.openNewEventDialog(arg, true);
  }

  private openNewEventDialog(arg, selection: boolean): void {
    let date: Date;
    if (!selection) {
      date = arg.date;
      date.setHours(7, 0, 0, 0);
    }
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: {isSelection: selection, date}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (!result.isSelection) {
          this.addEvent(date);
        } else {
          // Todo supprimer le mode selection
          // console.log(this.generateDatesFromRange(arg.start, arg.end));
        }
      }
    });
  }

  private addEvent(date) {
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      id: this.calendarEvents.length + 1,
      title: 'Créneau',
      start: date,
    });
  }

  // private generateDatesFromRange(startDate: Date, endDate: Date, startDay: number, endDay: number, startBreak: number, endBreak: number, duration: number): Date[] {
  //   const diffMonth = startDate.getMonth() !== endDate.getMonth();
  //   const dateList: Date[] = [];
  //   const firstMonthDaySelected = +moment(startDate).endOf('month').format('DD') - startDate.getDate();
  //   let i = 0;
  //
  //   if (diffMonth) {
  //     const firstDayOfSecondMonth = +moment(startDate).startOf('month').format('DD');
  //     const secondMonthDaySelected = endDate.getDate() - firstDayOfSecondMonth;
  //     while (i < secondMonthDaySelected) {
  //       const newDate = new Date();
  //       newDate.setFullYear(endDate.getFullYear(), endDate.getMonth(), firstDayOfSecondMonth + i);
  //       newDate.setHours(7, 0, 0, 0);
  //       dateList.push(newDate);
  //       i++;
  //     }
  //   }
  //   i = 0;
  //   while (i <= firstMonthDaySelected) {
  //     const newDate = new Date();
  //     newDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
  //     dateList.push(newDate);
  //     i++;
  //   }
  //   return dateList;
  // }
}
