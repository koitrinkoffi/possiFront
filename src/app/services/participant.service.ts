import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Participant} from '../model/participant';
import {Observable} from 'rxjs';

export class FileResponse {
  private _data: Participant[];
  private _errors;

  get data(): Participant[] {
    return this._data;
  }

  set data(value: Participant[]) {
    this._data = value;
  }

  get errors() {
    return this._errors;
  }

  set errors(value) {
    this._errors = value;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private httpClient: HttpClient) {}

  uploadFile(file): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileResponse>(environment.apiUrl + '/upload/participants', formData);
  }
}
