import { Injectable } from '@angular/core';
import {User} from '../model/user';
import * as moment from 'moment';

const TOKEN_KEY = 'possi-auth-token';
const USER_UID = 'possi-auth-uid';
const USER_KEY = 'possi-auth-user';
const EXPIRATION_KEY = 'possi-setup-time';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    const setupTimeValue = sessionStorage.getItem(EXPIRATION_KEY);
    if (setupTimeValue !== null) {
      const now = moment(new Date());
      const setupTime = moment(setupTimeValue);
      if (setupTime.isBefore(now)) {
        this.signOut();
      }
    }
  }

  signOut() {
    window.sessionStorage.clear();
  }

  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    const now = moment(new Date()).add('10', 'days');
    window.sessionStorage.setItem(EXPIRATION_KEY, now.format());
  }

  saveUid(uid: string) {
    window.sessionStorage.removeItem(USER_UID);
    window.sessionStorage.setItem(USER_UID, uid);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): User {
    return (JSON.parse(sessionStorage.getItem(USER_KEY)) as User);
  }

  getUserUid(): string {
    return window.sessionStorage.getItem(USER_UID);
  }
}
