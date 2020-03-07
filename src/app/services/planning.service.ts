import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Planning} from '../model/planning';
import {User} from '../model/user';
import {Classroom} from '../model/classroom';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getPlanningByUser(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>(environment.apiUrl + '/planning/list');
  }

  getPublicPlanning(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>(environment.apiUrl + '/planning/list/public');
  }

  createPlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(environment.apiUrl + '/planning/create',  planning);
  }
}
