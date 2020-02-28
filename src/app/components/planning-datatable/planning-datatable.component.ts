import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Planning} from '../../model/planning';
import {PlanningService} from '../../services/planning.service';
import {User} from '../../model/user';

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
    const user: User = new User(1, 'Oclean', 'Master', 'Super codeur', 'ok', 'email');
    this.parseData([ new Planning('1', 'Test 1', '03/02/2020', '03/02/2020', user),
      new Planning('2', 'Bof', '03/02/2020', '03/02/2020', user)]);
    this.planningService.getPlanningByUser().subscribe(data => {
      console.log(data);
    });
  }

  private applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  parseData(plannings: Planning[]) {
    this.planningElement = [];
    plannings.forEach(p => {
      this.planningElement.push({
        id: p.id,
        planning: p.title,
        creator: p.creator.firstName + ' ' + p.creator.lastName,
        startDate: p.startDate,
        endDate: p.endDate
      });
    });
    this.dataSource.data = this.planningElement;
  }
  private delete(id: string) {
    this.dataSource.data = this.planningElement.filter(p => p.id !== id);
  }
}
