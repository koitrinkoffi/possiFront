import {AfterViewInit, Component, DoCheck, EventEmitter, Input, KeyValueDiffers, OnInit, Output, ViewChild} from '@angular/core';
import {EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import * as moment from 'moment';
import tippy from 'tippy.js';
import * as $ from 'jquery';
import {OralDefense} from '../../model/oral-defense';
import {Planning} from '../../model/planning';
import {PlanningService} from '../../services/planning.service';
import {UnavailabilityBox} from '../../pages/unavailability/unavailability.component';
import {TimeBox} from '../../model/time-box';
import {DateRangeInput} from '@fullcalendar/core/datelib/date-range';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit, DoCheck {

  @ViewChild('calendar', {read: undefined, static: false}) calendarComponent: FullCalendarComponent;

  startTime;
  endTime;
  slotDuration;
  controlDrop;
  calendarVisible = true;
  calendarWeekends = true;
  dateRange: DateRangeInput;
  @Input()
  edit = false;
  calendarEvents: EventInput[];
  views;
  private oralDefenses = new Map<number, OralDefense>();
  oralDefensesUpdated = new Map<number, OralDefense>();
  private unavailabilities = new Map<number, TimeBox[]>();

  calendarPlugins = [interactionPlugin, timeGridPlugin, bootstrapPlugin, dayGridPlugin];
  @Output()
  changed = new EventEmitter<boolean>();

  constructor(private planningService: PlanningService) {
    this.controlDrop = (dropInfo, draggedEvent) => {
      const oralDefense = draggedEvent._def.extendedProps.tag as OralDefense;

      const isPresent = oralDefense.unavailabilities.filter(u =>
        moment(u.from).isSame(moment(dropInfo.start)) &&  moment(u.to).isSame(moment(dropInfo.end))
      ).length === 0;
      const oralDefenseFound = [];
      this.oralDefenses.forEach(o => {
        if ( o.id !== oralDefense.id && moment(o.timeBox.from).isSame(moment(dropInfo.start)) &&  moment(o.timeBox.to).isSame(moment(dropInfo.end))) {
          oralDefenseFound.push(o);
        }
      });
      const isFree = oralDefenseFound.filter(o => o.room.id === oralDefense.room.id).length === 0;

      return isPresent && isFree;
    };
  }

  ngAfterViewInit(): void {
    this.removeTodayHighLight();
  }

  ngDoCheck(): void {
    this.removeTodayHighLight();
  }

  ngOnInit() {
    this.planningService.getRevisionSelected().subscribe(p => {
      if (p != null) {
        this.parsePlanning(p);
      }
    });
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
      const oralDefense = new OralDefense(event.tag as OralDefense);
      oralDefense.timeBox.from = event.start;
      oralDefense.timeBox.to = event.end;
      const old = this.oralDefenses.get(oralDefense.id);
      if (oralDefense.timeBox.from === moment(old.timeBox.from).format() &&  oralDefense.timeBox.to === moment(old.timeBox.to).format()) {
        this.oralDefensesUpdated.delete(oralDefense.id);
      } else {
        this.oralDefensesUpdated.set(oralDefense.id, oralDefense);
      }
      this.changed.emit(this.oralDefensesUpdated.size > 0);
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
      if (!o.unavailabilities) {
        o.unavailabilities = this.unavailabilities.get(o.number);
      }
      this.oralDefenses.set(o.id, o);
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
    const api = this.calendarComponent.getApi();
    const from = moment(planning.period.from).format();
    if (api != null) {
      api.gotoDate(from);
    }
    this.dateRange = {
      start: from,
      end: moment(planning.period.to).format()
    };
    this.startTime = moment(planning.dayPeriod.from).format('HH:mm:ss');
    this.endTime = moment(planning.dayPeriod.to).format('HH:mm:ss');
    const duration = moment('00:00', 'HH:mm');
    duration.add(planning.oralDefenseDuration, 'minutes');
    this.slotDuration = duration.format('HH:mm:ss');
  }

  parseUnavailabityByOralDefense(oralDefenses: OralDefense[]) {
    oralDefenses.forEach( o => {
      this.unavailabilities.set(o.number, o.unavailabilities);
    });
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
