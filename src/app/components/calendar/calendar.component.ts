import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGrid from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import * as moment from 'moment';
import tippy from 'tippy.js';
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
        duration: { days: 3 },
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
    // info.el.setAttribute('title', info.event._def.extendedProps.description);
    const tag = info.event._def.extendedProps.tag;
    tippy(info.el, {
      content: `<h4 class="font-weight-bolder">Soutenance ${tag.number + 1}</h4>
                <div class="text-capitalize">${moment(info.event.start).format('dddd, DD MMMM')} | ${moment(info.event.start).format('HH:mm')} - ${moment(info.event.end).format('HH:mm')}</div>
                <br>
                <p class="font-weight-bolder">Participants :</p>
                <ul>
                <li><span class="text-uppercase">${tag.composition.student.lastName}</span> ${tag.composition.student.firstName} (Etudiant)</li>
                <li><span class="text-uppercase">${tag.composition.followingTeacher.lastName}</span> ${tag.composition.followingTeacher.firstName} (Enseignant référent)</li>
                <li><span class="text-uppercase">${tag.secondTeacher.lastName}</span> ${tag.secondTeacher.firstName} (Second enseignant)</li>
                <li>${tag.composition.tutorFullName} (Tuteur entreprise)</li>
                </ul>
                <div class="font-weight-bolder">Salle : ${tag.room.name}</div>`,
      allowHTML: true,
      animation: 'shift-away',
      trigger: 'click',
    });
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

  private parseEvent(oralDefenses: OralDefense[]) {
    const array: EventInput[] = [];
    oralDefenses.forEach(o => {
      array.push({
        tag: o,
        start: moment(o.timeBox.from).format(),
        end: moment(o.timeBox.to).format(),
        className: 'font-weight-bold',
        title: `Soutenance\n ${o.number + 1}`
      });
    });
    this.calendarEvents = array;
  }

  parsePlanning(planning: Planning) {
    this.calendarComponent.getApi().gotoDate(moment(planning.period.from).format());
    this.startTime = moment(planning.dayPeriod.from).format('HH:mm:ss');
    this.endTime = moment(planning.dayPeriod.to).format('HH:mm:ss');
    this.parseEvent(planning.oralDefenses);
  }
}
