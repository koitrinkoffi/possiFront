import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OralDefense} from '../../model/oral-defense';
import {OralDefenseUserPipe} from '../../filters/oral-defense-user.pipe';
import {OralDefenseSearchPipe} from '../../filters/oral-defense-search.pipe';
import {AuthService} from '../../services/auth.service';
import {Planning} from '../../model/planning';
import * as moment from 'moment';
import {PlanningService} from '../../services/planning.service';
import {showNotification} from '../../utils/notify';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material';

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
  @Input()
  updated: boolean;
  @Input()
  timer: number;
  planningIsSelected = false;
  defaultRevision = false;
  ownOralDefenses = true;
  nbOwnOralDefenses = 0;
  otherOraDefenses = true;
  nbOtherOraDefenses = 0;
  @Output()
  oralDefenseSelected = new EventEmitter<OralDefense[]>();
  @Output()
  onGenerateButton = new EventEmitter();
  nbSearch = 0;
  authService: AuthService;
  revisionSelectedId: number|string;
  revisions: Planning[];
  isAdmin = false;
  constructor(authService: AuthService, private planningService: PlanningService, public dialog: MatDialog) {
    this.authService = authService;
  }

  ngOnInit() {
    this.planningService.getPlanningSelected().subscribe(p => {
      if (p != null) {
        this.planning = p;
        this.isAdmin = p.admin.id === this.authService.user.id;
        if (this.planning.generated) {
          this.revisions = this.planning.revisions;
          if (this.planning.newUnavailabilities) {
            this.revisionSelectedId = 'updated';
            this.oralDefenses = this.planning.oralDefenses;
          }
        }
      }
    });
    this.planningService.getRevisionSelected().subscribe(p => {
      if (p != null) {
        this.parseData(p);
        this.revisionSelectedId = p.id;
        this.planningIsSelected = true;
        this.oralDefenses = p.oralDefenses;
        if (this.planning != null && this.planning.defaultRevision != null) {
          this.defaultRevision = this.planning.defaultRevision.id != this.revisionSelectedId;
        } else if (this.planning != null && this.revisions.find(r => r.id == this.revisionSelectedId) != undefined) {
          this.defaultRevision = true;
        } else {
          this.defaultRevision = false;
        }
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
    if (this.revisionSelectedId == 'update') {
      this.planningService.setRevisionSelected(this.planning);
    } else {
      this.planningService.setRevisionSelected(this.planning.revisions.find( r => r.id == this.revisionSelectedId));
    }
  }

  generate() {
    this.onGenerateButton.emit();
  }

  changeDefaultRevision() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Modification de la version par défaut du planning',
        content: 'Cette version sera affiché à l\'ensemble de vos collaborateurs. Voulez vous vraiment le faire ?',
        cancelLabel: 'Non',
        submitLabel: 'Oui',
        submitClass: 'btn-success',
        cancelClass: 'btn-danger'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.planningService.updateDefaultRevision(this.planning.id, this.revisionSelectedId).subscribe(p => {
          showNotification('Vos modifications ont été prises en compte', 'success');
          this.planningService.setPlanningSelected(p);
          this.defaultRevision = false;
        }, e => showNotification('Nous avons rencontré un problème. Veuillez réessayer plus tard.', 'danger'));
      }
    });
  }

  createRevision() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Création de version de planning',
        content: 'Cette version sera basée sur les nouvelles indisponibilités signalées. Voulez vous vraiment le faire ?',
        cancelLabel: 'Non',
        submitLabel: 'Oui',
        submitClass: 'btn-success',
        cancelClass: 'btn-danger'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        showNotification('veuillez patienter un moment...', 'primary');
        this.planningService.createRevision(this.planning.id).subscribe(p => {
          showNotification('Vos modifications ont été prises en compte', 'success');
          this.revisions = p.revisions;
          this.revisionSelectedId = this.revisions[this.revisions.length - 1].id;
          this.defaultRevision = true;
          this.planning = p;
        }, e => showNotification('Nous avons rencontré un problème. Veuillez réessayer plus tard.', 'danger'));
      }
    });
  }
}
