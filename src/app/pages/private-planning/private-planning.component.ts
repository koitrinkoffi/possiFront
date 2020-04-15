import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PlanningDatatableComponent} from '../../components/planning-datatable/planning-datatable.component';
import {PlanningService} from '../../services/planning.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-private-planning',
  templateUrl: './private-planning.component.html',
  styleUrls: ['./private-planning.component.scss']
})
export class PrivatePlanningComponent implements OnInit, AfterViewInit {
  @ViewChild('planningDatatable', {static: false})
  private planningDatatable: PlanningDatatableComponent;

  constructor(private authService: AuthService, private planningService: PlanningService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.planningService.getPlannings().subscribe(data => {
      this.planningDatatable.parseData(data);
    });
  }

}
