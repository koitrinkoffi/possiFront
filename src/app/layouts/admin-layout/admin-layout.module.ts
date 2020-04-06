import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../../pages/home/home.component';
import {PlanningDatatableComponent} from '../../components/planning-datatable/planning-datatable.component';
import {UnavailabilityComponent} from '../../pages/unavailability/unavailability.component';
import {CreatePlanningComponent} from '../../pages/create-planning/create-planning.component';
import {ClassroomSelectorComponent} from '../../components/classroom-selector/classroom-selector.component';
import {ClassroomPipe} from '../../filters/classroom.pipe';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatIconModule,
  MatInputModule, MatNativeDateModule, MatPaginatorIntl,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule,
  MatSortModule, MatStepperModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getFrenchPaginatorIntl} from '../../utils/frenchPaginatorintl';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {RouterModule} from '@angular/router';
import {StudentRegisterComponent} from '../../pages/student-register/student-register.component';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {PrivatePlanningComponent} from '../../pages/private-planning/private-planning.component';
import {CardComponent} from '../../components/card/card.component';
import {UnavailabilityChooserComponent} from '../../components/unavailability-chooser/unavailability-chooser.component';
import {ParticipantDatatableComponent} from '../../components/participant-datatable/participant-datatable.component';
import {IsBeforeLunchBreakPipe} from '../../filters/is-before-lunch-break.pipe';
import {IsAfterLunchBreakPipe} from '../../filters/is-after-lunch-break.pipe';
import {CalendarSideBarComponent} from '../../components/calendar-side-bar/calendar-side-bar.component';
import {PlanningDisplayComponent} from '../../pages/planning-display/planning-display.component';
import {OralDefenseUserPipe} from '../../filters/oral-defense-user.pipe';
import {OralDefenseSearchPipe} from '../../filters/oral-defense-search.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    PlanningDatatableComponent,
    UnavailabilityComponent,
    CreatePlanningComponent,
    ClassroomSelectorComponent,
    ClassroomPipe,
    StudentRegisterComponent,
    PrivatePlanningComponent,
    CalendarComponent,
    CardComponent,
    UnavailabilityChooserComponent,
    ParticipantDatatableComponent,
    CalendarSideBarComponent,
    PlanningDisplayComponent,
    OralDefenseUserPipe,
    IsBeforeLunchBreakPipe,
    IsAfterLunchBreakPipe,
    OralDefenseSearchPipe
  ],
  exports: [
    HomeComponent,
    PlanningDatatableComponent,
    UnavailabilityComponent,
    CreatePlanningComponent,
    ClassroomSelectorComponent,
    ClassroomPipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    FormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    FullCalendarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ],
  providers: [
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
})
export class AdminLayoutModule { }
