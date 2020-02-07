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
    MatSortModule, MatInputModule, MatIconModule, MatTabsModule
} from '@angular/material';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanningDatatableComponent } from './components/planning-datatable/planning-datatable.component';
import {getFrenchPaginatorIntl} from './frenchPaginatorintl';
import { UnavailabilityComponent } from './components/unavailability/unavailability.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':planningName/unavailability', component: UnavailabilityComponent },
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
    ],
  providers: [{provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()}],
  bootstrap: [AppComponent]
})
export class AppModule { }
