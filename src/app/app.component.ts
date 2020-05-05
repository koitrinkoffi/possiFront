import {AfterViewInit, Component} from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from 'jquery';
import * as moment from 'moment';
import {AuthService} from './services/auth.service';
import {PlanningService} from './services/planning.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  // tslint:disable-next-line:variable-name
  _router: Subscription;
  lastPoppedUrl: string;
  yScrollStack: number[] = [];
  logged = false;
  planningIsSelected = false;

  constructor( public location: Location, public router: Router, public authService: AuthService, public planningService: PlanningService) {
    moment.locale('fr');
  }

  ngAfterViewInit() {
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
    let $sidebar_responsive = $('body > .navbar-collapse');
    let $sidebar = $('.sidebar');
    let $sidebar_img_container = $sidebar.find('.sidebar-background');
    const isWindows = navigator.platform.indexOf('Win') > -1;

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function

      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    document.getElementsByTagName('body')[0].classList.add('sidebar-mini');
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

    if(windowWidth > 767){
      if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
        $('.fixed-plugin .dropdown').addClass('open');
      }

    }

    $('.fixed-plugin a').click(function(event){
      // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
      if($(this).hasClass('switch-trigger')){
        if(event.stopPropagation){
          event.stopPropagation();
        }
        else if(window.event){
          window.event.cancelBubble = true;
        }
      }
    });

    $('.fixed-plugin .badge').click(function(){
      let $full_page_background = $('.full-page-background');


      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      var new_color = $(this).data('color');

      if($sidebar.length !== 0){
        $sidebar.attr('data-color', new_color);
      }

      if($sidebar_responsive.length != 0){
        $sidebar_responsive.attr('data-color',new_color);
      }
    });

    $('.fixed-plugin .img-holder').click(function(){
      let $full_page_background = $('.full-page-background');

      $(this).parent('li').siblings().removeClass('active');
      $(this).parent('li').addClass('active');


      var new_image = $(this).find("img").attr('src');

      if($sidebar_img_container.length !=0 ){
        $sidebar_img_container.fadeOut('fast', function(){
          $sidebar_img_container.css('background-image','url("' + new_image + '")');
          $sidebar_img_container.fadeIn('fast');
        });
      }

      if($full_page_background.length != 0){

        $full_page_background.fadeOut('fast', function(){
          $full_page_background.css('background-image','url("' + new_image + '")');
          $full_page_background.fadeIn('fast');
        });
      }

      if($sidebar_responsive.length != 0){
        $sidebar_responsive.css('background-image','url("' + new_image + '")');
      }
    });

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

  private isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
