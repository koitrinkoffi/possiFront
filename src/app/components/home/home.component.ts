import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {PlanningDatatableComponent} from '../planning-datatable/planning-datatable.component';
import {PlanningService} from '../../services/planning.service';
import {Planning} from '../../model/planning';
import {User} from '../../model/user';
import * as moment from 'moment';
import {showNotification} from '../../utils/notify';
import {CalendarComponent} from '../calendar/calendar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  @ViewChild('calendarComponent', {read: undefined, static: false}) calendarComponent: CalendarComponent;
  constructor(private userService: UserService, private planningService: PlanningService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.planningService.findById(1).subscribe(p => this.calendarComponent.parsePlanning(p));
  }
}
