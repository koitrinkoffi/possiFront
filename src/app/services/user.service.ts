import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this._user = new User(1, 'Koitrin', 'KOFFI', 1, 'koikoffi', 'koitrin.koffi@etudiant.univ-rennes1.fr');
  }


  get user(): User {
    return this._user;
  }

  getUsers(): any {
    return this.httpClient.get(environment.apiUrl + '/person/list');
  }
}
