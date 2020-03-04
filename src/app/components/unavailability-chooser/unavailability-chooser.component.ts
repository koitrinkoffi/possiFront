import { Component, OnInit } from '@angular/core';
import {Unvailability} from '../../model/unvailability';

@Component({
  selector: 'app-unavailability-chooser',
  templateUrl: './unavailability-chooser.component.html',
  styleUrls: ['./unavailability-chooser.component.scss']
})
export class UnavailabilityChooserComponent implements OnInit {

  private unvailabilities: Unvailability[] = [];

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
