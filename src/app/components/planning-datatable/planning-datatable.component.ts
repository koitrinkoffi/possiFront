import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Planning} from '../../model/planning';
import {PlanningService} from '../../services/planning.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-planning-datatable',
  templateUrl: './planning-datatable.component.html',
  styleUrls: ['./planning-datatable.component.scss']
})
export class PlanningDatatableComponent implements OnInit {
  private planningService: PlanningService;
  private displayedColumns: string[] = ['planning', 'creator', 'start', 'end', 'actions'];
  private user: User;
  private dataSource: MatTableDataSource<Planning>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(planning: PlanningService) {
    this.user = new User('Oclean', 'Master', 'Super codeur');
    this.planningService = planning;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Planning>([
      new Planning('Test 1', this.user, '03/02/2020', '03/02/2020'),
      new Planning('Bof', this.user, '03/02/2020', '03/02/2020')
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.planningService.getPlanningByUser().subscribe(data => {
      console.log(data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
