import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {PlanningService} from '../../services/planning.service';
import {CalendarSideBarComponent} from '../../components/calendar-side-bar/calendar-side-bar.component';
import {OralDefense} from '../../model/oral-defense';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Planning} from '../../model/planning';
import * as moment from 'moment';

@Component({
  selector: 'app-planning-display',
  templateUrl: './planning-display.component.html',
  styleUrls: ['./planning-display.component.scss']
})
export class PlanningDisplayComponent implements AfterViewInit, OnDestroy {

  @ViewChild('calendarComponent', {read: undefined, static: false})
  private calendarComponent: CalendarComponent;
  @ViewChild('calendarSideBarComponent', {read: undefined, static: false})
  private calendarSideBarComponent: CalendarSideBarComponent;
  constructor(private authService: AuthService, private planningService: PlanningService, private route: ActivatedRoute) {
  }
  ngOnDestroy() {
    this.planningService.setPlanningSelected(null);
  }

  ngAfterViewInit(): void {
    this.planningService.findById(+this.route.snapshot.paramMap.get('id')).subscribe(p => {
      this.planningService.setPlanningSelected(p);
      this.calendarComponent.parsePlanning(p);
      this.calendarSideBarComponent.parseOralDefense(p.oralDefenses);
    });
  }

  private loadOralDefense(oralDefenses: OralDefense[]) {
    if (this.calendarComponent !== undefined) {
      this.calendarComponent.parseEvent(oralDefenses);
    }
  }

  fromNow(date: string): string {
    return moment(date).fromNow();
  }
}
