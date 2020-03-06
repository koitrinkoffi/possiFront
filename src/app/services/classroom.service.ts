import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Classroom} from '../model/classroom';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Classroom[]> {
    return this.httpClient.get<Classroom[]>(environment.apiUrl + '/room/list');
  }

  public create(classroom: Classroom[]): any {
    const names: string[] = classroom.map(c => c.name);
    return this.httpClient.post(environment.apiUrl + '/room/createMany', names);
  }
}
