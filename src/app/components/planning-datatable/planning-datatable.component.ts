import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Planning} from '../../model/planning';
import {PlanningService} from '../../services/planning.service';
import * as moment from 'moment';
import {AuthService} from '../../services/auth.service';

export interface PlanningElement {
  id: string|number;
  planning: string;
  creator: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-planning-datatable',
  templateUrl: './planning-datatable.component.html',
  styleUrls: ['./planning-datatable.component.scss']
})
export class PlanningDatatableComponent implements OnInit {
  planningElement: PlanningElement[];
  @Input()
  title: string;
  @Input()
  subtitle = '';
  displayedColumns: string[] = ['planning', 'creator', 'start', 'end', 'actions'];
  dataSource: MatTableDataSource<PlanningElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  planningService: PlanningService;
  authService: AuthService;
  constructor(planningService: PlanningService, authService: AuthService) {
    this.planningService = planningService;
    this.authService = authService;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PlanningElement>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  parseData(plannings: Planning[]) {
    this.planningElement = [];
    plannings.forEach(p => {
      this.planningElement.push({
        id: p.id,
        planning: p.name,
        creator: p.admin.firstName + ' ' + p.admin.lastName,
        startDate: moment(p.period.from).format(Planning.dateFormat()),
        endDate: moment(p.period.to).format(Planning.dateFormat()),
      });
    });
    this.dataSource.data = this.planningElement;
  }

  delete(id: string) {
    this.planningService.delete(+id).subscribe( data => {
      this.planningElement = this.planningElement.filter(p => p.id !== id);
      this.dataSource.data = this.planningElement;
    });
  }
}
