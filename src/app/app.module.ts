import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {PlanningDatatableComponent} from './components/planning-datatable/planning-datatable.component';
import {UnavailabilityComponent} from './pages/unavailability/unavailability.component';
import {CreatePlanningComponent} from './pages/create-planning/create-planning.component';
import {ClassroomSelectorComponent} from './components/classroom-selector/classroom-selector.component';
import {ClassroomPipe} from './filters/classroom.pipe';
import {StudentRegisterComponent} from './pages/student-register/student-register.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {CardComponent} from './components/card/card.component';
import {UnavailabilityChooserComponent} from './components/unavailability-chooser/unavailability-chooser.component';
import {ParticipantDatatableComponent} from './components/participant-datatable/participant-datatable.component';
import {CalendarSideBarComponent} from './components/calendar-side-bar/calendar-side-bar.component';
import {PlanningDisplayComponent} from './pages/planning-display/planning-display.component';
import {OralDefenseUserPipe} from './filters/oral-defense-user.pipe';
import {IsBeforeLunchBreakPipe} from './filters/is-before-lunch-break.pipe';
import {IsAfterLunchBreakPipe} from './filters/is-after-lunch-break.pipe';
import {OralDefenseSearchPipe} from './filters/oral-defense-search.pipe';
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
import {FullCalendarModule} from '@fullcalendar/angular';
import {getFrenchPaginatorIntl} from './utils/frenchPaginatorintl';
import {AuthInterceptor} from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    PlanningDatatableComponent,
    UnavailabilityComponent,
    CreatePlanningComponent,
    ClassroomSelectorComponent,
    ClassroomPipe,
    StudentRegisterComponent,
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
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
