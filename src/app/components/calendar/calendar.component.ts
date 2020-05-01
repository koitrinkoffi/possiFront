import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import * as moment from 'moment';
import tippy from 'tippy.js';
import * as $ from 'jquery';
import {OralDefense} from '../../model/oral-defense';
import {Planning} from '../../model/planning';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar', {read: undefined, static: false}) calendarComponent: FullCalendarComponent;

  startTime;
  endTime;
  slotDuration;
  controlDrop;
  calendarVisible = true;
  calendarWeekends = true;
  @Input()
  edit = false;
  calendarEvents: EventInput[];
  views;

  calendarPlugins = [interactionPlugin, timeGridPlugin, bootstrapPlugin, dayGridPlugin];

  constructor() {
    this.controlDrop = (dropInfo, draggedEvent) => {
      const oralDefense = draggedEvent._def.extendedProps.tag as OralDefense;
      return oralDefense.unavailabilities.filter(u =>
        moment(u.from).isSame(moment(dropInfo.start)) &&  moment(u.to).isSame(moment(dropInfo.end))
      ).length === 0;
    };
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

  render(info) {
    const tag = info.event._def.extendedProps.tag;
    if (tag !== undefined) {
      let content = `<h4 class="font-weight-bolder">Soutenance ${tag.number + 1}</h4>
                <div class="text-capitalize">${moment(info.event.start).format('dddd, DD MMMM')} | ${moment(info.event.start).format('HH:mm')} - ${moment(info.event.end).format('HH:mm')}</div>
                <br>
                <p class="font-weight-bolder">Participants :</p>
                <ul>
                <li><span class="text-uppercase">${tag.student.lastName}</span> ${tag.student.firstName} (Etudiant)</li>
                <li><span class="text-uppercase">${tag.followingTeacher.lastName}</span> ${tag.followingTeacher.firstName} (Enseignant référent)</li>`;
      if (tag.secondTeacher) {
        content = content + `<li><span class="text-uppercase">${tag.secondTeacher.lastName}</span> ${tag.secondTeacher.firstName} (Second enseignant)</li>`;
      }
      content = content + `<li>${tag.tutorFullName} (Tuteur entreprise)</li>
                </ul>
                <div class="font-weight-bolder">Entreprise : ${tag.company}</div>
                <div class="font-weight-bolder">Salle : ${tag.room.name}</div>`;
      tippy(info.el, {
        content,
        allowHTML: true,
        animation: 'shift-away',
        trigger: 'click',
      });
    }
  }

  eventUpdate(eventDropInfo) {
    // tslint:disable-next-line:triple-equals
    const event = this.calendarEvents.find(e => e.id == eventDropInfo.event.id);
    if (event !== undefined) {
      event.start = moment(eventDropInfo.event.start).format();
      event.end = moment(eventDropInfo.event.end).format();
      this.refreshCalendar();
    }
  }

  refreshCalendar() {
    this.calendarComponent.getApi().removeAllEventSources();
    this.calendarComponent.getApi().addEventSource(this.calendarEvents);
  }

  removeTodayHighLight($event?: any) {
    $('.fc-today').removeClass('alert alert-info');
  }

  parseEvent(oralDefenses: OralDefense[]) {
    const array: EventInput[] = [];
    oralDefenses.forEach(o => {
      array.push({
        id: o.id,
        tag: o,
        start: moment(o.timeBox.from).format(),
        end: moment(o.timeBox.to).format(),
        className: `font-weight-bold event-${o.color.code} clickable-item`,
        title: `Soutenance\n ${o.number + 1}`
      });
    });
    this.calendarEvents = array;
    this.refreshCalendar();
  }

  parsePlanning(planning: Planning) {
    this.calendarComponent.getApi().gotoDate(moment(planning.period.from).format());
    this.startTime = moment(planning.dayPeriod.from).format('HH:mm:ss');
    this.endTime = moment(planning.dayPeriod.to).format('HH:mm:ss');
    const duration = moment('00:00', 'HH:mm');
    duration.add(planning.oralDefenseDuration, 'minutes');
    this.slotDuration = duration.format('HH:mm:ss');
  }

  controlDragAndDrop(info, onDrag: boolean) {
    //   // tslint:disable-next-line:triple-equals
    if (onDrag) {
      const oralDefense = this.calendarEvents.find(e => e.id == info.event.id).tag as OralDefense;
      oralDefense.unavailabilities.forEach(u =>
        this.calendarEvents.push({
          start: moment(u.from).format(),
          end: moment(u.to).format(),
          color: '#ef5350',
          rendering: 'background'}));
      this.calendarComponent.getApi().removeAllEventSources();
      this.calendarComponent.getApi().addEventSource(this.calendarEvents.filter(e => e.id != oralDefense.id));
    } else {
      this.calendarEvents = this.calendarEvents.filter(e => e.rendering === undefined);
      this.refreshCalendar();
    }
  }

}
