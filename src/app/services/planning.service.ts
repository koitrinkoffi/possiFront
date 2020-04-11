import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Planning} from '../model/planning';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  planningSelected: Planning;

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  getPlannings(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>(environment.apiUrl + '/planning/list/' + this.userService.user.uid);
  }

  createPlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(environment.apiUrl + '/planning/create',  planning);
  }

  findById(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(environment.apiUrl + '/planning/' + id);
  }

  findByName(planningName: string): Observable<Planning> {
    return this.httpClient.get<Planning>(environment.apiUrl + '/planning/find/' + planningName);
  }
}
