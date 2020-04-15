import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    droits: number[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Accueil',  icon: 'home', class: '', droits: [0, 1, 2] },
    { path: '/private/planning', title: 'Mes plannings',  icon: 'calendar_today', class: '', droits: [0, 1, 2]},
   // { path: '#', title: 'Plannings assignés',  icon: 'assignment', class: '' },
    { path: '/create/planning', title: 'Nouveau planning',  icon: 'note_add', class: '', droits: [2] },
    { path: '/student/register', title: 'Informations personnelles',  icon: 'account_circle', class: '', droits: [0] },
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem.droits.includes(this.authService.user.role));
  }
  isMobileMenu() {
      return !($(window).width() > 991);
  }
}
