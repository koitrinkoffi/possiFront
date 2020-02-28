import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatButtonModule} from '@angular/material';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { FormContainerComponent } from './components/form-container/form-container.component';



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
    MatButtonModule,
    SweetAlert2Module.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
