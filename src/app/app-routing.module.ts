import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'create/planning',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
