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
  MatSortModule, MatInputModule, MatIconModule
} from '@angular/material';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanningDatatableComponent } from './components/planning-datatable/planning-datatable.component';
import {getFrenchPaginatorIntl} from './frenchPaginatorintl';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    AppBarComponent,
    MessageBoxComponent,
    HomeComponent,
    PlanningDatatableComponent,
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
  ],
  providers: [{provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()}],
  bootstrap: [AppComponent]
})
export class AppModule { }
