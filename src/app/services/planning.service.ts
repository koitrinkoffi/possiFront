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

  private readonly baseUrl = environment.app_url + '/plannings';
  planningSelected: Planning;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getPlannings(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>( environment.app_url + '/persons/' + this.authService.user.uid + '/plannings');
  }

  createPlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(this.baseUrl, planning);
  }

  findById(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/' + id);
  }

  findByName(planningName: string): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/find/' + planningName);
  }
}
