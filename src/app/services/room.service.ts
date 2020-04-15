import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Room} from '../model/room';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly baseUrl = environment.app_url + '/rooms';
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseUrl);
  }

  public create(classroom: Room[]): Observable<Room[]> {
    const names: string[] = classroom.map(c => c.name);
    return this.httpClient.post<Room[]>(this.baseUrl, names);
  }
}
