import { Component, OnInit } from '@angular/core';
import {TabHeader} from '../table/table.component';

@Component({
  selector: 'app-unavailability',
  templateUrl: './unavailability.component.html',
  styleUrls: ['./unavailability.component.scss']
})
export class UnavailabilityComponent implements OnInit {

  private planningName = 'Test 1';
  private tabHeaders: TabHeader[] = [];
  constructor() { }

  ngOnInit() {
    this.tabHeaders.push({
      label: 'Test',
      icon: 'home',
      first: true
    });
    this.tabHeaders.push({
      label: 'Drole',
      icon: 'home',
      first: false
    });
  }

}
