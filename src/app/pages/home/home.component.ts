import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {PlanningDatatableComponent} from '../../components/planning-datatable/planning-datatable.component';
import {PlanningService} from '../../services/planning.service';
import {Planning} from '../../model/planning';
import {User} from '../../model/user';
import * as moment from 'moment';
import {showNotification} from '../../utils/notify';
import {CalendarComponent} from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
