import { Component, OnInit } from '@angular/core';
import {TabHeader} from '../table/table.component';
import {Unavailability} from '../../model/unavailability';
import {UnavailabilityService} from '../../services/unavailability.service';

@Component({
  selector: 'app-unavailability',
  templateUrl: './unavailability.component.html',
  styleUrls: ['./unavailability.component.scss']
})
export class UnavailabilityComponent implements OnInit {

  private planningName = 'Test 1';
  private unavailabilities: Unavailability[] = [];
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
  constructor(private unavailabilityService: UnavailabilityService) { }

  ngOnInit() {

    this.unavailabilityService.getAgenda(1, 1).subscribe(data => {
      console.log(data);
    });

    this.unavailabilities.push(new Unavailability(
      1,
      1,
      '20200208T0800',
      '20200208T0900',
      false
    ));

    this.unavailabilities.push(new Unavailability(
      1,
      1,
      '20200208T1500',
      '20200208T1600',
      false
    ));

    this.unavailabilities.push(new Unavailability(
      1,
      1,
      '20200216T1000',
      '20200216T1200',
      false
    ));
  }

  private syncChoice(choice: Unavailability) {
    this.unavailabilities.find(u => u === choice).available = choice.available;
  }
}
