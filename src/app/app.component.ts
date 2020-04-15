import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from 'jquery';
import * as moment from 'moment';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  // tslint:disable-next-line:variable-name
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor( public location: Location, private router: Router, private authService: AuthService) {
    moment.locale('fr');
  }

  ngAfterViewInit() {
    console.log(this.authService.user);
    const isWindows = navigator.platform.indexOf('Win') > -1;

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function

      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      document.getElementsByTagName('body')[0].classList.add('sidebar-mini');
    }
    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;

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
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const ps = new PerfectScrollbar(elemSidebar);
    }

    const windowWidth = $(window).width();

    if (windowWidth > 767) {
      const pluginDropdown = $('.fixed-plugin .dropdown');
      if (pluginDropdown.hasClass('show-dropdown')) {
        pluginDropdown.addClass('open');
      }

    }
  }

  isMaps(path) {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice( 1 );
    return path !== title;
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
