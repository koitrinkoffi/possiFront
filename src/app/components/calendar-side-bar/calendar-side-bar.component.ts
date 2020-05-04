import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OralDefense} from '../../model/oral-defense';
import {OralDefenseUserPipe} from '../../filters/oral-defense-user.pipe';
import {OralDefenseSearchPipe} from '../../filters/oral-defense-search.pipe';
import {AuthService} from '../../services/auth.service';
import {Planning} from '../../model/planning';
import * as moment from 'moment';
import {PlanningService} from '../../services/planning.service';

@Component({
  selector: 'app-calendar-side-bar',
  templateUrl: './calendar-side-bar.component.html',
  styleUrls: ['./calendar-side-bar.component.scss']
})
export class CalendarSideBarComponent implements OnInit {

  panelOpenState = false;
  oralDefenses: OralDefense[];
  planning: Planning;
  search: string;
  ownOralDefenses = true;
  nbOwnOralDefenses = 0;
  otherOraDefenses = true;
  nbOtherOraDefenses = 0;
  @Output()
  oralDefenseSelected = new EventEmitter<OralDefense[]>();
  nbSearch = 0;
  authService: AuthService;
  revisionSelectedId: number;
  revisions: Planning[];
  constructor(authService: AuthService, private planningService: PlanningService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.planningService.getPlanningSelected().subscribe(p => {
      if (p != null) {
        this.planning = p;
        this.revisions = this.planning.revisions;
      }
    });
    this.planningService.getRevisionSelected().subscribe(p => {
      if (p != null) {
        this.parseData(p);
        this.revisionSelectedId = p.id;
        this.oralDefenses = p.oralDefenses;
      }
    });
  }

  parseData(planning: Planning) {
    const oralDefenses = planning.oralDefenses;
    oralDefenses.sort((a, b) => a.number < b.number ? -1 : 1);
    this.oralDefenses = oralDefenses;
    this.updateOralDefenseToShow();
  }

  updateOralDefenseToShow() {
    if (this.search === undefined || this.search === '') {
      const own = new OralDefenseUserPipe().transform(this.oralDefenses, this.authService.user.uid, true);
      const other = new OralDefenseUserPipe().transform(this.oralDefenses, this.authService.user.uid, false);
      this.nbOwnOralDefenses = own.length;
      this.nbOtherOraDefenses = other.length;
      if (this.ownOralDefenses && this.otherOraDefenses) {
        this.oralDefenseSelected.emit(this.oralDefenses);
      } else if (this.ownOralDefenses) {
        this.oralDefenseSelected.emit(own);
      } else if (this.otherOraDefenses) {
        this.oralDefenseSelected.emit(other);
      } else {
        this.oralDefenseSelected.emit([]);
      }
    } else {
      const search = new OralDefenseSearchPipe().transform(this.oralDefenses, this.search);
      this.nbSearch = search.length;
      this.oralDefenseSelected.emit(search);
    }
  }

  formatedDate(date: string, format: string) {
    return moment(date).format(format);
  }

  changeRevision() {
    this.planningService.setRevisionSelected(this.planning.revisions.find( r => r.id == this.revisionSelectedId));
  }
}
