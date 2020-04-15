import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Planning} from '../model/planning';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  planningSelected: Planning;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getPlannings(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>(environment.app_url + '/plannings' + this.authService.user.uid);
  }

  createPlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(environment.app_url + '/plannings/create',  planning);
  }

  findById(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(environment.app_url + '/plannings/' + id);
  }

  findByName(planningName: string): Observable<Planning> {
    return this.httpClient.get<Planning>(environment.app_url + '/plannings/find/' + planningName);
  }
}
