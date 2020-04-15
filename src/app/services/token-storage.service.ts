import { Injectable } from '@angular/core';
import {User} from '../model/user';

const TOKEN_KEY = 'possi-auth-token';
const USER_UID = 'possi-auth-uid';
const USER_KEY = 'possi-auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveUid(uid: string) {
    window.sessionStorage.removeItem(USER_UID);
    window.sessionStorage.setItem(USER_UID, uid);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getUid(): string {
    return sessionStorage.getItem(USER_UID);
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
