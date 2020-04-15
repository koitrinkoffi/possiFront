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
    return this.httpClient.get<Classroom[]>(environment.app_url + '/room/list');
  }

  public create(classroom: Classroom[]): Observable<Classroom[]> {
    const names: string[] = classroom.map(c => c.name);
    return this.httpClient.post<Classroom[]>(environment.app_url + '/room/create', names);
  }
}
