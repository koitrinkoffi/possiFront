import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAll(): any {
    return this.httpClient.get(environment.apiUrl + '/room/list');
  }

  public create(classroom: string[]): any {
    return this.httpClient.post(environment.apiUrl + '/room/createMany', classroom);
  }
}
