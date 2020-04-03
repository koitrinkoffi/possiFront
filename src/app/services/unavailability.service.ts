import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Unavailability} from '../model/unavailability';

@Injectable({
  providedIn: 'root'
})
export class UnavailabilityService {

  constructor(private httpClient: HttpClient) { }

  getAgenda(planningId: number, userUid: string): any {
    return this.httpClient.get(environment.apiUrl + '/unavailability/agenda/' + planningId + '/' + userUid);
  }

  sendUnavailabilities(planningId: number, toRemove: Unavailability[], toAdd: Unavailability[]): any {
    return this.httpClient.post(environment.apiUrl + '/unavailability/update/' + planningId, {
      toRemove,
      toAdd,
    });
  }
}
