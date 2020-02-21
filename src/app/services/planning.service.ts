import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Planning} from '../model/planning';
import {User} from '../model/user';
import {Classroom} from '../model/classroom';

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

  createPlanning(planning: Planning, teachers?, students?) {
    const formData: FormData = new FormData();
    formData.append('studentCsv', students);
    formData.append('teachers', teachers);
    formData.append('planning', planning.getRequestData());
    return this.httpClient.post(environment + '/planning/create', { params: formData});
  }
}
