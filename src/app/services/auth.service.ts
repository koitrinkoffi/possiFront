import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {StorageService} from './storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as converter from 'xml-js';
import {BehaviorSubject} from 'rxjs';

export class AuthenticationResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  private _loginState = new BehaviorSubject<boolean>(false);
  loginState = this._loginState.asObservable();


  constructor(private tokenStorageService: StorageService,
              private httpClient: HttpClient,
              private router: Router) {
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
        .subscribe(data => {
          },
          error => {
            const uid = this.extractUid(error.error.text);
            if (uid !== '') {
              this.tokenStorageService.saveUid(uid);
              setTimeout(() => {
                console.log('je navigue');
                this.authenticateToAPI(this.tokenStorageService.getUserUid());
              }, 1000);
            } else {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          });
    } else {
      this.authenticateToAPI(this.tokenStorageService.getUserUid());
    }
  }

  authenticateToAPI(uid: string) {
    const formData = new FormData();
    formData.append('uid', uid);
    return this.httpClient
      .post<AuthenticationResponse>(`${environment.app_url}/authenticate`, formData)
      .subscribe(data => {
        if (data.user.role === 'TEACHER') {
          data.user.role = 1;
        } else if (data.user.role === 'ADMIN') {
          data.user.role = 2;
        } else {
          data.user.role = 0;
        }
        this.saveInSession(data);
        this.user = this.tokenStorageService.getUser();
        this._loginState.next(true);
        this.router.navigate(['']);
      });
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
