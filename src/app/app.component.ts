import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';
import * as moment from 'moment';
import {AuthService} from './services/auth.service';
import {PlanningService} from './services/planning.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _router: Subscription;
  lastPoppedUrl: string;
  yScrollStack: number[] = [];
  logged = false;
  planningIsSelected = false;

  constructor( public location: Location, public router: Router, public authService: AuthService, public planningService: PlanningService) {
    moment.locale('fr');
  }

  ngOnInit() {
    if (!this.authService.isLogged()) {
      this.authService.loginState.subscribe(b => {
        this.logged = b;
        if (this.logged) {
          this.init();
        }
      });
    } else {
      this.logged = true;
      this.planningService.getRevisionSelected().subscribe(p => this.planningIsSelected = p !== null);
      this.init();
    }
  }

  init() {
    const isWindows = navigator.platform.indexOf('Win') > -1;

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function

      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    document.getElementsByTagName('body')[0].classList.add('sidebar-mini');

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    }

  }

  isMaps(path) {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice( 1 );
    return path !== title;
  }

  private isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
