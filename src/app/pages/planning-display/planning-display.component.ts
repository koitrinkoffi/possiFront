import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {UserService} from '../../services/user.service';
import {PlanningService} from '../../services/planning.service';
import {Planning} from '../../model/planning';
import {CalendarSideBarComponent} from '../../components/calendar-side-bar/calendar-side-bar.component';
import {OralDefense} from '../../model/oral-defense';
import {ActivatedRoute} from '@angular/router';

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
  constructor(private userService: UserService, private planningService: PlanningService, private route: ActivatedRoute) {
  }
  ngOnInit() {}

  ngAfterViewInit(): void {
    // if (this.planningService.planningSelected === undefined) {
    //   this.planningService.findByName(this.route.snapshot.paramMap.get('planningName'));
    // }
    // this.calendarComponent.parsePlanning(this.planningService.planningSelected);
    this.planningService.findById(1).subscribe(p => {
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
