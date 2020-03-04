import { Component, OnInit } from '@angular/core';
import {TabHeader} from '../table/table.component';
import {Unvailability} from '../../model/unvailability';

@Component({
  selector: 'app-unavailability',
  templateUrl: './unavailability.component.html',
  styleUrls: ['./unavailability.component.scss']
})
export class UnavailabilityComponent implements OnInit {

  private planningName = 'Test 1';
  private tabHeaders: TabHeader[] = [{
    label: 'Tableau',
    icon: 'table_chart',
    first: true
  },
    {
      label: 'Calendrier',
      icon: 'calendar_today',
      first: false
    }];
  constructor() { }

  ngOnInit() {}

}
