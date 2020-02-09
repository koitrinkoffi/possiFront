import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', {read: undefined, static: false}) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, interactionPlugin, timeGrigPlugin];
  private calendarVisible = true;
  private calendarWeekends = true;
  private calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];
  constructor() { }

  ngOnInit() {
  }

  render(info) {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = 'X';
    spanElement.classList.add('calendar-remove-btn');
    spanElement.addEventListener('click', () => info.event.remove());
    info.el.appendChild(spanElement);
  }
  onMouseEnter(info) {
    const spanElement = info.el.lastChild as HTMLElement;
    spanElement.classList.add('calendar-remove-btn-display');
  }
  onMouseLeave(info) {
    const spanElement = info.el.lastChild as HTMLElement;
    spanElement.classList.remove('calendar-remove-btn-display');
  }
}
