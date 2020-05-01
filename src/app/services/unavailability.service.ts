import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Unavailability} from '../model/unavailability';

@Injectable({
  providedIn: 'root'
})
export class UnavailabilityService {
  private readonly baseUrl = environment.app_url + '/unavailabilities';
  constructor(private httpClient: HttpClient) { }

  getAgenda(planningId: number, userUid: string): any {
    return this.httpClient.get(this.baseUrl + '/agenda/' + planningId + '/' + userUid);
  }

  sendUnavailabilities(planningId: number, toRemove: Unavailability[], toAdd: Unavailability[]): any {
    return this.httpClient.post(this.baseUrl + '/update/' + planningId, {
      toRemove,
      toAdd,
    });
  }
}
