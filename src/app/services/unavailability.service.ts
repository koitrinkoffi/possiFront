import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnavailabilityService {

  constructor(private httpClient: HttpClient) { }

  getAgenda(planningId: number, userId: string): any {
    return this.httpClient.get(environment.apiUrl + '/unavailability/agenda/' + planningId + '/' + userId);
  }
}
