import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminLayoutModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
