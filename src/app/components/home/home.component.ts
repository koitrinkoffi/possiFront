import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {PlanningDatatableComponent} from '../planning-datatable/planning-datatable.component';
import {PlanningService} from '../../services/planning.service';
import {Planning} from '../../model/planning';
import {User} from '../../model/user';
import * as moment from 'moment';
import {showNotification} from '../../utils/notify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('planningDatatable', {static: false})
  private planningDatatable: PlanningDatatableComponent;

  constructor(private userService: UserService, private planningService: PlanningService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.planningService.getPlannings().subscribe(data => {
      this.planningDatatable.parseData(data);
    });
  }

}
