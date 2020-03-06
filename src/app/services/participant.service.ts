import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private httpClient: HttpClient) {}

  uploadFile(file): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(environment.apiUrl + '/upload', formData);
  }
}
