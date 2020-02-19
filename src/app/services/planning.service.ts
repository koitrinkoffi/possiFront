import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Planning} from '../model/planning';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getPlanningByUser(): any {
    return this.httpClient.get(environment.apiUrl + 'planning/list');
  }

  getPublicPlanning(): any {
    return this.httpClient.get(environment.apiUrl + '/planning/list/public');
  }

  createPlanning(planning: Planning) {
    const params: HttpParams = new HttpParams();
    params.set('dayPeriodStart','');
    params.set('dayPeriodEnd','');
    params.set('lunchBreakEnd','');
    params.set('lunchBreakStart','');
    params.set('name','');
    params.set('nbMaxOralDefensePerDay','');
    params.set('oralDefenseDuration','');
    params.set('oralDefenseInterlude','');
    params.set('periodEnd','');
    params.set('periodStart','');
    params.set('rooms','');
    return this.httpClient.get(environment + '/planning/create', {});
  }
}
