import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Accueil',  icon: 'home', class: '' },
    { path: '/private/planning', title: 'Mes plannings',  icon: 'calendar_today', class: '' },
    // { path: '#', title: 'Plannings assignés',  icon: 'assignment', class: '' },
    { path: '/create/planning', title: 'Nouveau planning',  icon: 'note_add', class: '' },
    { path: '/student/register', title: 'Informations personnelles',  icon: 'account_circle', class: '' },
    // { path: '/private/planning', title: 'Maps',  icon: 'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      return !($(window).width() > 991);
  }
}
