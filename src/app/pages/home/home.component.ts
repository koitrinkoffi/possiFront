import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PlanningService} from '../../services/planning.service';
import {PlanningDatatableComponent} from '../../components/planning-datatable/planning-datatable.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('planningDatatable', {static: false})
  planningDatatable: PlanningDatatableComponent;

  constructor(private planningService: PlanningService) {
  }

  ngAfterViewInit(): void {
    this.planningService.getAll().subscribe(data => {
      this.planningDatatable.parseData(data);
    });
  }
}
