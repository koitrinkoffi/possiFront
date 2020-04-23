import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {PlanningService} from '../../services/planning.service';
import {CalendarSideBarComponent} from '../../components/calendar-side-bar/calendar-side-bar.component';
import {OralDefense} from '../../model/oral-defense';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-planning-display',
  templateUrl: './planning-display.component.html',
  styleUrls: ['./planning-display.component.scss']
})
export class PlanningDisplayComponent implements OnInit, AfterViewInit {

  @ViewChild('calendarComponent', {read: undefined, static: false})
  private calendarComponent: CalendarComponent;
  @ViewChild('calendarSideBarComponent', {read: undefined, static: false})
  private calendarSideBarComponent: CalendarSideBarComponent;
  constructor(private authService: AuthService, private planningService: PlanningService, private route: ActivatedRoute) {
  }
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.planningService.findById(+this.route.snapshot.paramMap.get('id')).subscribe(p => {
      this.calendarComponent.parsePlanning(p);
      this.calendarSideBarComponent.parseOralDefense(p.oralDefenses);
    });
  }

  private loadOralDefense(oralDefenses: OralDefense[]) {
    if (this.calendarComponent !== undefined) {
      this.calendarComponent.parseEvent(oralDefenses);
    }
  }
}
