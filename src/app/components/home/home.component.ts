import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {PlanningDatatableComponent} from '../planning-datatable/planning-datatable.component';
import {PlanningService} from '../../services/planning.service';
import {Planning} from '../../model/planning';
import {User} from '../../model/user';
import * as moment from 'moment';

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
    const plannings: Planning[] = [];
    this.planningService.getPublicPlanning().subscribe(data => {
      data.forEach(p => {
        plannings.push(new Planning(p.id, p.name, moment(p.period.from).format(Planning.dateFormat()), moment(p.period.to).format(Planning.dateFormat()), new User(p.admin.id, p.admin.firstName, p.admin.lastName, p.admin.role, p.admin.uid, p.admin.email)));
      });
      this.planningDatatable.parseData(plannings);
    });
  }

}
