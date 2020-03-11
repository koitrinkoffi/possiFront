import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Planning} from '../../model/planning';
import {PlanningService} from '../../services/planning.service';
import {User} from '../../model/user';
import * as moment from 'moment';

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
  private planningService: PlanningService;
  private planningElement: PlanningElement[];
  @Input()
  private title: string;
  @Input()
  private subtitle = '';
  private displayedColumns: string[] = ['planning', 'creator', 'start', 'end', 'actions'];
  private dataSource: MatTableDataSource<PlanningElement>;

  @ViewChild(MatPaginator, {static: true}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) private sort: MatSort;
  constructor(planning: PlanningService) {
    this.planningService = planning;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PlanningElement>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private applyFilter(filterValue: string) {
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
        endDate: moment(p.period.to).format(Planning.dateFormat())
      });
    });
    this.dataSource.data = this.planningElement;
  }

  private delete(id: string) {
    this.dataSource.data = this.planningElement.filter(p => p.id !== id);
  }
}
