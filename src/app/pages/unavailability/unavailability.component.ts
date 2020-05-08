import {Component, OnInit} from '@angular/core';
import {Unavailability} from '../../model/unavailability';
import {UnavailabilityService} from '../../services/unavailability.service';
import * as moment from 'moment';
import {PlanningService} from '../../services/planning.service';
import {TimeBox} from '../../model/time-box';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Planning} from '../../model/planning';
import {LunchBreakPipe} from '../../filters/lunch-break.pipe';
import {showNotification} from '../../utils/notify';

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

  // Todo verifier la date de creation pour dire depuis combien temps le planning a été créer

  planning: Planning;
  unavailabilities: Unavailability[] = [];
  matrix: UnavailabilityBox[][] = [];
  width: number;
  height: number;
  isLoaded = false;
  constructor(private unavailabilityService: UnavailabilityService,
              private planningService: PlanningService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private lunchBreakPipe: LunchBreakPipe) { }

  ngOnInit() {
    this.planningService.findById(+this.route.snapshot.paramMap.get('id')).subscribe(p => {
      this.planning = p;
      this.unavailabilityService.getAgenda(this.planning.id, this.authService.user.uid).subscribe(data => {
        const timeBoxes: TimeBox[] = [];
        data.timeBoxes.forEach(t => {
          timeBoxes.push(new TimeBox(t.from, t.to));
        });
        this.unavailabilities = data.unavailabilities;
        this.height = this.planning.nbMaxOralDefensePerDay;
        const from = moment(this.planning.period.from);
        const to = moment(this.planning.period.to);
        this.width = to.diff(from, 'days') + 1;
        let i = 0;
        let j = 0;
        while (i < this.height) {
          this.matrix.push([]);
          while (j < this.width) {
            const timeBox = timeBoxes[this.height * j + i];
            const unavailability = this.unavailabilities.find(u => timeBox.from === u.period.from && timeBox.to === u.period.to);
            this.matrix[i].push(unavailability !== undefined ?
              new UnavailabilityBox(unavailability, true, i, j) :
              new UnavailabilityBox(new Unavailability(this.authService.user, timeBox), false, i, j));
            j++;
          }
          i++;
          j = 0;
        }
        this.isLoaded = true;
      });
    });
  }

  checkColumns(column: number, lunchBreak: boolean) {
    const m = this.getTimeBoxesWithoutLunchBreak(lunchBreak);
    let i = 0;
    while (i < m.length) {
      m[i][column].checked = !m[i][column].checked;
      i++;
    }
  }

  checkRows(row: number) {
    let i = 0;
    while (i < this.width) {
      this.matrix[row][i].checked = !this.matrix[row][i].checked;
      i++;
    }
  }

  getTimeBoxesWithoutLunchBreak(lunchBreak: boolean): UnavailabilityBox[][] {
    if (lunchBreak) {
      return this.lunchBreakPipe.transform(this.matrix, this.planning, 2);
    }
    const customMatrix: UnavailabilityBox[][] = this.lunchBreakPipe.transform(this.matrix, this.planning, 0);
    return customMatrix.concat(this.lunchBreakPipe.transform(this.matrix, this.planning, 1));
  }

  validate() {
    showNotification('veuillez patienter un moment...', 'primary');
    let newUnavailabilities: Unavailability[] = [];
    let i = 0;
    while (i < this.height) {
      newUnavailabilities = newUnavailabilities.concat(this.matrix[i].filter(d => d.checked)
        .map(value => value.unavailability));
      i++;
    }
    this.unavailabilityService.sendUnavailabilities(this.planning.id,
      this.unavailabilities.filter(d => !newUnavailabilities.includes(d)),
      newUnavailabilities.filter(d => !this.unavailabilities.includes(d))).subscribe(
      d => showNotification('Vos modifications ont été prises en compte.', 'success'),
      e => showNotification('Nous avons rencontré un problème. Veuillez réessayer plus tard.', 'danger'));
  }

  formatDate(date: string, format: string) {
    return moment(date).format(format);
  }

  fromNow(date: string): string {
    return moment(date).fromNow();
  }
}
