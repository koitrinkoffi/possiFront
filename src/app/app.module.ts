import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminLayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
