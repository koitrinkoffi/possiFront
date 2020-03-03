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
  private unvailabilities: Unvailability[] = [];
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

  ngOnInit() {
    this.unvailabilities.push(new Unvailability(
      1,
      1,
      '20200208T0800',
      '20200208T0900',
      true
    ));

    this.unvailabilities.push(new Unvailability(
      1,
      1,
      '20200208T1500',
      '20200208T1600',
      true
    ));

    this.unvailabilities.push(new Unvailability(
      1,
      1,
      '20200216T1000',
      '20200216T1200',
      true
    ));
  }

  private toggleAvailability(unvailability: Unvailability) {
    unvailability.available = !unvailability.available;
  }

}
