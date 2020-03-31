import { Component, OnInit } from '@angular/core';
import {TabHeader} from '../table/table.component';
import {Unavailability} from '../../model/unavailability';
import {UnavailabilityService} from '../../services/unavailability.service';
import * as moment from 'moment';
import {PlanningService} from '../../services/planning.service';
import {TimeBox} from '../../model/time-box';
import {UserService} from '../../services/user.service';

export class UnavailabilityBox {

  constructor(unavailability: Unavailability, checked: boolean, row: number, column: number) {
    this.unavailability = unavailability;
    this.checked = checked;
    this.row = row;
    this.column = column;
  }

  unavailability: Unavailability;
  checked: boolean;
  row: number;
  column: number;
}
@Component({
  selector: 'app-unavailability',
  templateUrl: './unavailability.component.html',
  styleUrls: ['./unavailability.component.scss']
})
export class UnavailabilityComponent implements OnInit {

  private planningName = 'Test 1';
  private unavailabilities: Unavailability[] = [];
  private matrix: UnavailabilityBox[][] = [];
  private width: number;
  private height: number;
  constructor(private unavailabilityService: UnavailabilityService, private planningService: PlanningService, private userService: UserService) { }

  ngOnInit() {
    this.unavailabilityService.getAgenda(1, 'koikoffi').subscribe(data => {
      this.planningService.find(1).subscribe(p => {
        this.planningService.planningSelected = p;
        const timeBoxes: TimeBox[] = [];
        data.timeBoxes.forEach(t => {
          timeBoxes.push(new TimeBox(t.from, t.to));
        });
        this.unavailabilities = data.unavailabilities;
        this.height = this.planningService.planningSelected.nbMaxOralDefensePerDay;
        const from = moment(this.planningService.planningSelected.period.from);
        const to = moment(this.planningService.planningSelected.period.to);
        this.width = to.diff(from, 'days') + 1;
        let i = 0;
        let j = 0;
        while (i < this.height) {
          this.matrix.push([]);
          while (j < this.width) {
            const timeBox = timeBoxes[this.height * j + i];
            const unavailability = this.unavailabilities.find(u => timeBox.equals(u.period));
            this.matrix[i].push(unavailability !== undefined ?
              new UnavailabilityBox(unavailability, true, i, j) :
              new UnavailabilityBox(new Unavailability(this.userService.user, timeBox), false, i, j));
            j++;
          }
          i++;
          j = 0;
        }
      });
    });

  }

  private checkColumns(column: number) {
    let i = 0;
    while (i < this.height) {
      this.matrix[i][column].checked = !this.matrix[i][column].checked;
      i++;
    }
  }

  private checkRows(row: number) {
    let i = 0;
    while (i < this.width) {
      this.matrix[row][i].checked = !this.matrix[row][i].checked;
      i++;
    }
  }

  private validate() {
    let newUnavailabilities: Unavailability[] = [];
    let i = 0;
    while (i < this.height) {
      newUnavailabilities = newUnavailabilities.concat(this.matrix[i].filter(d => d.checked)
        .map(value => value.unavailability));
      i++;
    }
    this.unavailabilityService.sendUnavailabilities(1,
      this.unavailabilities.filter(d => !newUnavailabilities.includes(d)),
      newUnavailabilities.filter(d => !this.unavailabilities.includes(d))).subscribe(d => {
      console.log(d);
    });
    console.log('Sent');
  }
}
