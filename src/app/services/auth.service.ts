import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {TokenStorageService} from './token-storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as converter from 'xml-js';

export class AuthenticationResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  private readonly jwt: string;

  constructor(private tokenStorageService: TokenStorageService,
              private httpClient: HttpClient,
              private router: Router) {
    this.jwt = tokenStorageService.getToken();
    this.user = tokenStorageService.getUser();
  }

  isLogged(): boolean {
    return this.tokenStorageService.getUser() !== null;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.open(environment.cas_url + '/logout?service=' + environment.app_url, '_self');
  }

  login() {
    if (this.tokenStorageService.getUserUid() === null) {
      const ticket = window.location.search.replace('?ticket=', '');
      if (!ticket) {
        window.open(environment.cas_url + '/login?locale=fr_FR&service=' + environment.app_url, '_self');
      }
      this.httpClient.get(environment.cas_url + '/serviceValidate?ticket=' + ticket + '&service=' + environment.app_url)
        .subscribe(data => {},
          error => {
            const uid = this.extractUid(error.error.text);
            if (uid !== '') {
              this.tokenStorageService.saveUid(uid);
            }
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
    } else {
      const formData = new FormData();
      formData.append('uid', this.tokenStorageService.getUserUid());
      return this.httpClient
        .post<AuthenticationResponse>(`${environment.app_url}/authenticate`, formData)
        .subscribe(data => {
          this.saveInSession(data);
          setTimeout(() => {
              window.location.reload();
          }, 1000);
        });
    }
  }

  private saveInSession(data: AuthenticationResponse) {
    this.tokenStorageService.saveToken(data.token);
    this.tokenStorageService.saveUser(data.user);
  }

  private extractUid(data: string): string {
    const jsonData = JSON.parse(converter.xml2json(data, {compact: true, spaces: 4}));
    const success = jsonData['cas:serviceResponse']['cas:authenticationSuccess'];
    if (success) {
      return success['cas:user']._text;
    }
    return '';
  }
}
