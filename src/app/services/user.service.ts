import { Injectable } from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;
  constructor() {
    this._user = new User('Koitrin', 'KOFFI', 'professeur');
  }


  get user(): User {
    return this._user;
  }
}
