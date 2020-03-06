import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Classroom} from '../model/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  constructor(private httpClient: HttpClient) {}

  public getAll(): any {
    return this.httpClient.get(environment.apiUrl + '/room/list');
  }

  public create(classroom: Classroom[]): any {
    const names: string[] = classroom.map(c => c.label);
    return this.httpClient.post(environment.apiUrl + '/room/createMany', names);
  }
}
