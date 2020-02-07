import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getPlanningByUser(): any {
    return this.httpClient.get(baseUrl + 'planning/list');
  }
}
