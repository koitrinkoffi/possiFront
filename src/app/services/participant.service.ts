import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Participant} from '../model/participant';
import {Observable} from 'rxjs';

export class FileResponse {
   data: Participant[];
   errors;
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private httpClient: HttpClient) {}

  uploadFile(file): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileResponse>(environment.app_url + '/upload/participants', formData);
  }
}
