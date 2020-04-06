import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {UserService} from '../../services/user.service';
import {PlanningService} from '../../services/planning.service';

@Component({
  selector: 'app-planning-display',
  templateUrl: './planning-display.component.html',
  styleUrls: ['./planning-display.component.scss']
})
export class PlanningDisplayComponent implements OnInit, AfterViewInit {


  @ViewChild('calendarComponent', {read: undefined, static: false}) calendarComponent: CalendarComponent;
  constructor(private userService: UserService, private planningService: PlanningService) {
  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.calendarComponent.parsePlanning(this.planningService.planningSelected);
  }

}
