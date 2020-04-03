import {AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGrid from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import * as moment from 'moment';
import * as $ from 'jquery';
import {Classroom} from '../../model/classroom';
import {OralDefense} from '../../model/oral-defense';
import {Planning} from '../../model/planning';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar', {read: undefined, static: false}) calendarComponent: FullCalendarComponent;

  private startTime;
  private endTime;
  private calendarVisible = true;
  private calendarWeekends = true;
  private edit = true;
  private calendarEvents: EventInput[];
  private views;
  private resources: any[] = [];

  private calendarPlugins = [interactionPlugin, timeGridPlugin, bootstrapPlugin, resourceTimeGrid];

  constructor() {
  }

  ngAfterViewInit(): void {
    this.removeTodayHighLight();
  }

  ngOnInit() {
    this.views = {
      resourceTimeGridFiveDay: {
        type: 'resourceTimeGrid',
        duration: { days: 5 },
        buttonText: '5 Jours'
      }
    };
  }

  private addRemoveBtn(info) {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = 'X';
    spanElement.classList.add('calendar-remove-btn');
    spanElement.addEventListener('click', () => info.event.remove());
    info.el.appendChild(spanElement);
  }

  private render(info) {
    info.el.setAttribute('data-toggle', 'tooltip');
    info.el.setAttribute('title', info.event._def.title);
    if (this.edit) {
      this.addRemoveBtn(info);
    }
  }

  private onMouseEnter(info) {
    if (this.edit) {
      const spanElement = info.el.lastChild as HTMLElement;
      spanElement.classList.add('calendar-remove-btn-display');
    }
  }

  private onMouseLeave(info) {
    if (this.edit) {
      const spanElement = info.el.lastChild as HTMLElement;
      spanElement.classList.remove('calendar-remove-btn-display');
    }
  }

  private onEventClick(info) {
    if (!this.edit) {
    }
  }

  private eventUpdate(eventDropInfo) {
    const event = this.calendarEvents.find(e => e.id == eventDropInfo.event.id);
    if (event !== undefined) {
      event.start = moment(eventDropInfo.event.start).format();
      event.end = moment(eventDropInfo.event.end).format();
      this.refreshCalendar();
    }
  }

  private refreshCalendar() {
    this.calendarComponent.getApi().removeAllEventSources();
    this.calendarComponent.getApi().addEventSource(this.calendarEvents);
  }

  private removeTodayHighLight($event?: any) {
    $('.fc-today').removeClass('alert alert-info');
  }

  private parseResource(rooms: Classroom[]) {
    const array: any [] = [];
    rooms.forEach(r => array.push({id: r.id, title: r.name}));
    this.resources = array;
  }

  private parseEvent(oralDefenses: OralDefense[]) {
    const array: EventInput[] = [];
    oralDefenses.forEach(o => {
    array.push({
        title: o.composition.student.firstName + ' ' + o.composition.student.lastName + '\n' +
          o.composition.followingTeacher.firstName + ' ' + o.composition.followingTeacher.lastName + '\n' +
          o.secondTeacher.firstName + ' ' + o.secondTeacher.lastName + '\n' +
          o.composition.tutorFullName,
        start: moment(o.timeBox.from).format(),
        end: moment(o.timeBox.to).format(),
        className: 'font-weight-bold',
        resourceId: o.room.id
      });
    });
    this.calendarEvents = array;
    console.log(this.calendarEvents);
  }

  parsePlanning(planning: Planning) {
    this.calendarComponent.getApi().gotoDate(moment(planning.period.from).format());
    this.startTime = moment(planning.dayPeriod.from).format('HH:mm:ss');
    this.endTime = moment(planning.dayPeriod.to).format('HH:mm:ss');
    this.parseResource(planning.rooms);
    this.parseEvent(planning.oralDefenses);
  }
}
