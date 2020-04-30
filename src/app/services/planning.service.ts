import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Planning} from '../model/planning';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {OralDefense} from '../model/oral-defense';

export class FileResponse {
  data: OralDefense[];
  errors;
}

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private readonly baseUrl = environment.app_url + '/plannings';

  private mPlanningSelected = new BehaviorSubject<Planning>(null);

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>( environment.app_url + '/persons/' + this.authService.user.uid + '/plannings');
  }

  create(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(this.baseUrl, planning);
  }

  findById(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/' + id);
  }

  findByName(planningName: string): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/find/' + planningName);
  }

  delete(id: number) {
    return this.httpClient.delete<any>(this.baseUrl + '/' + id);
  }

  uploadFile(file): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileResponse>(environment.app_url + '/upload/participants', formData);
  }

  getPlanningSelected(): Observable<Planning> {
    return this.mPlanningSelected.asObservable();
  }

  setPlanningSelected(planning: Planning) {
    this.mPlanningSelected.next(planning);
  }
}
