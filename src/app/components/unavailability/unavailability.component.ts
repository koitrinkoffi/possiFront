import { Component, OnInit } from '@angular/core';
import {TabHeader} from '../table/table.component';
import {Unavailability} from '../../model/unavailability';
import {UnavailabilityService} from '../../services/unavailability.service';
import * as moment from 'moment';

@Component({
  selector: 'app-unavailability',
  templateUrl: './unavailability.component.html',
  styleUrls: ['./unavailability.component.scss']
})
export class UnavailabilityComponent implements OnInit {

  private planningName = 'Test 1';
  private unavailabilities: Unavailability[] = [];
  private headers: string[] = [];
  private lines: any[] = [];
  constructor(private unavailabilityService: UnavailabilityService) { }

  ngOnInit() {
    this.unavailabilityService.getAgenda(1, 1).subscribe(data => {
      this.headers = data[0].days.map(day => day.day);
      this.lines = data;
      console.log(moment(data[0].days[0].timebox.from).format('HH:mm'));
    });
  }
}
