import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import {
  MatButtonModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorIntl,
  MatSortModule,
  MatInputModule,
  MatIconModule,
  MatTabsModule,
  MatStepperModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatChipsModule, MatAutocompleteModule, MatCheckboxModule
} from '@angular/material';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanningDatatableComponent } from './components/planning-datatable/planning-datatable.component';
import {getFrenchPaginatorIntl} from './frenchPaginatorintl';
import { UnavailabilityComponent } from './components/unavailability/unavailability.component';
import { CreatePlanningComponent } from './components/create-planning/create-planning.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClassroomSelectorComponent } from './components/classroom-selector/classroom-selector.component';
import { PersonDatatableComponent } from './components/person-datatable/person-datatable.component';
import { ClassroomPipe } from './filters/classroom.pipe';
import { StudentRegisterComponent } from './components/student-register/student-register.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':planningName/unavailability', component: UnavailabilityComponent },
  { path: 'create/planning', component: CreatePlanningComponent },
  { path: 'student/register', component: StudentRegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    AppBarComponent,
    MessageBoxComponent,
    HomeComponent,
    PlanningDatatableComponent,
    UnavailabilityComponent,
    CreatePlanningComponent,
    ClassroomSelectorComponent,
    PersonDatatableComponent,
    ClassroomPipe,
    StudentRegisterComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        RouterModule.forRoot(
            appRoutes,
            // { enableTracing: true }
        ),
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
        MatAutocompleteModule,
        MatCheckboxModule,
        FormsModule,
    ],
  providers: [
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
