import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  private appName = 'Possi Front';
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    moment.locale('fr');
  }

  ngOnInit() {
  }

}
