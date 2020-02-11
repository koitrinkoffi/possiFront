import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';

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
  private edit = false;
  private calendarEvents: EventInput[];

  private calendarPlugins = [dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrapPlugin];

  constructor() {
    this.calendarEvents = [
      {
        id: 1,
        title: 'Event Now',
        start: new Date(),
        backgroundColor: removeBackgroundColor
      }
    ];
  }

  ngOnInit() {
  }

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
      this.calendarComponent.getApi().removeAllEventSources();
      this.calendarComponent.getApi().addEventSource(this.calendarEvents);
    }
  }

  private onMouseLeave(info) {
    if (this.edit) {
      const spanElement = info.el.lastChild as HTMLElement;
      spanElement.classList.remove('calendar-remove-btn-display');
    }
  }
}
