import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {PlanningService} from '../../services/planning.service';
import {CalendarSideBarComponent} from '../../components/calendar-side-bar/calendar-side-bar.component';
import {OralDefense} from '../../model/oral-defense';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Planning} from '../../model/planning';
import * as moment from 'moment';
import {showNotification} from '../../utils/notify';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-planning-display',
  templateUrl: './planning-display.component.html',
  styleUrls: ['./planning-display.component.scss']
})
export class PlanningDisplayComponent implements AfterViewInit, OnDestroy {

  planning: Planning;
  @ViewChild('calendarComponent', {read: undefined, static: false})
  calendarComponent: CalendarComponent;
  @ViewChild('calendarSideBarComponent', {read: undefined, static: false})
  calendarSideBarComponent: CalendarSideBarComponent;
  authService: AuthService;
  planningService: PlanningService;
  route: ActivatedRoute;
  private interval;
  timeLeft = 15;
  updated = false;

  constructor(authService: AuthService, planningService: PlanningService, route: ActivatedRoute, public dialog: MatDialog) {
    this.authService = authService;
    this.planningService = planningService;
    this.route = route;
  }

  ngOnDestroy() {
    this.planningService.setPlanningSelected(null);
    this.planningService.setRevisionSelected(null);
    clearInterval(this.interval);
  }

  ngAfterViewInit(): void {
    this.planningService.findById(+this.route.snapshot.paramMap.get('id')).subscribe(p => {
      this.planning = p;
      this.planningService.setPlanningSelected(this.planning);
      this.startTimer();
      if (!this.planning.generated) {
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            title: 'Génération de planning',
            content: 'Ce planning n\'a pas encore été généré. Voulez vous que je le fasse pour vous ?',
            cancelLabel: 'Non',
            submitLabel: 'Oui',
            submitClass: 'btn-success',
            cancelClass: 'btn-danger',
            timer: this.timeLeft
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.generate();
          }
        });
      } else {
        this.calendarComponent.parseUnavailabityByOralDefense(this.planning.oralDefenses);
        if (!this.planning.newUnavailabilities && this.planning.defaultRevision != null) {
          this.planningService.setRevisionSelected(this.planning.defaultRevision);
        } else {
          this.planningService.setRevisionSelected(this.planning);
        }
        this.planningService.setPlanningSelected(this.planning);
      }
    });
  }

  loadOralDefense(oralDefenses: OralDefense[]) {
    if (this.calendarComponent !== undefined) {
      this.calendarComponent.parseEvent(oralDefenses);
    }
  }

  fromNow(date: string): string {
    return moment(date).fromNow();
  }

  validate() {
    showNotification('veuillez patienter un moment...', 'primary');
    const array: OralDefense[] = [];
    this.calendarComponent.oralDefensesUpdated.forEach(o => array.push(o));
    this.planningService.updateOralDefenses(this.planning.id, array).subscribe(d => {
        this.planningService.getRevisions(d.id).subscribe(rev => {
          showNotification('Vos modifications ont été prises en compte', 'success');
          d.revisions = rev;
          this.planning = d;
          this.planningService.setPlanningSelected(this.planning);
          this.calendarSideBarComponent.revisionSelectedId = rev[rev.length - 1].id;
          this.calendarSideBarComponent.defaultRevision = false;
          this.updated = false;
          this.calendarComponent.oralDefensesUpdated.clear();
        }, e => showNotification('Nous avons rencontré un problème. Veuillez réessayer plus tard.', 'danger'));
      },
      e => showNotification('Nous avons rencontré un problème. Veuillez réessayer plus tard.', 'danger'));
  }

  canValidate(event: boolean) {
    this.updated = event;
  }

  generate() {
    showNotification('veuillez patienter un moment...', 'primary');
    setTimeout(() => {
      this.planningService.generate(this.planning.id).subscribe(planning => {
        showNotification('Vos modifications ont été prises en compte.', 'success');
        this.planning = planning;
        this.calendarComponent.parseUnavailabityByOralDefense(this.planning.oralDefenses);
        this.planningService.setPlanningSelected(this.planning);
        this.planningService.setRevisionSelected(this.planning);
      }, e => showNotification('Nous avons rencontré un problème. Veuillez réessayer plus tard.', 'danger'));
    }, 1000);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timeLeft);
      }
    }, 1000);
  }
}
