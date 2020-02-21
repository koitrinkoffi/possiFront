import { Routes } from '@angular/router';
import {HomeComponent} from '../../components/home/home.component';
import {UnavailabilityComponent} from '../../components/unavailability/unavailability.component';
import {CreatePlanningComponent} from '../../components/create-planning/create-planning.component';
import {StudentRegisterComponent} from '../../components/student-register/student-register.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: ':planningName/unavailability', component: UnavailabilityComponent },
  { path: 'create/planning', component: CreatePlanningComponent },
  { path: 'student/register', component: StudentRegisterComponent}
];
