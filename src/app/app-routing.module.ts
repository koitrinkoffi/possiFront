import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UnavailabilityComponent} from './pages/unavailability/unavailability.component';
import {PlanningDisplayComponent} from './pages/planning-display/planning-display.component';
import {CreatePlanningComponent} from './pages/create-planning/create-planning.component';
import {StudentRegisterComponent} from './pages/student-register/student-register.component';
import {PrivatePlanningComponent} from './pages/private-planning/private-planning.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'planning/:planningName/unavailability', component: UnavailabilityComponent },
      { path: 'planning/:planningName', component: PlanningDisplayComponent },
      { path: 'create/planning', component: CreatePlanningComponent },
      { path: 'student/register', component: StudentRegisterComponent},
      { path: 'private/planning', component: PrivatePlanningComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
