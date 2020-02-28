import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatatableComponent} from '../../components/datatable/datatable.component';
import {MessageBoxComponent} from '../../components/message-box/message-box.component';
import {HomeComponent} from '../../components/home/home.component';
import {PlanningDatatableComponent} from '../../components/planning-datatable/planning-datatable.component';
import {UnavailabilityComponent} from '../../components/unavailability/unavailability.component';
import {CreatePlanningComponent} from '../../components/create-planning/create-planning.component';
import {ClassroomSelectorComponent} from '../../components/classroom-selector/classroom-selector.component';
import {PersonDatatableComponent} from '../../components/person-datatable/person-datatable.component';
import {ClassroomPipe} from '../../filters/classroom.pipe';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatIconModule,
  MatInputModule, MatNativeDateModule, MatPaginatorIntl,
  MatPaginatorModule,
  MatSortModule, MatStepperModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getFrenchPaginatorIntl} from '../../utils/frenchPaginatorintl';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    DatatableComponent,
    MessageBoxComponent,
    HomeComponent,
    PlanningDatatableComponent,
    UnavailabilityComponent,
    CreatePlanningComponent,
    ClassroomSelectorComponent,
    PersonDatatableComponent,
    ClassroomPipe
  ],
  exports: [
    DatatableComponent,
    MessageBoxComponent,
    HomeComponent,
    PlanningDatatableComponent,
    UnavailabilityComponent,
    CreatePlanningComponent,
    ClassroomSelectorComponent,
    PersonDatatableComponent,
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
    MatCheckboxModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
})
export class AdminLayoutModule { }
