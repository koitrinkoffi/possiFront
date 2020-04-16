import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UnavailabilityComponent} from './pages/unavailability/unavailability.component';
import {PlanningDisplayComponent} from './pages/planning-display/planning-display.component';
import {CreatePlanningComponent} from './pages/create-planning/create-planning.component';
import {AuthGuard} from './guards/auth.guard';
import {TeacherGuard} from './guards/teacher.guard';
import {AdminGuard} from './guards/admin.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent},
      { path: 'planning/:id/unavailability', component: UnavailabilityComponent , canActivate: [TeacherGuard]},
      { path: 'planning/:id', component: PlanningDisplayComponent },
      { path: 'create/planning', component: CreatePlanningComponent, canActivate: [AdminGuard] },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
