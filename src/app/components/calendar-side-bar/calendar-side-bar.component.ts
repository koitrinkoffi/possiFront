import {Component, OnInit} from '@angular/core';
import {OralDefense} from '../../model/oral-defense';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-calendar-side-bar',
  templateUrl: './calendar-side-bar.component.html',
  styleUrls: ['./calendar-side-bar.component.scss']
})
export class CalendarSideBarComponent implements OnInit {

  panelOpenState = false;
  private oralDefenses: OralDefense[];
  private search: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  parseOralDefense(oralDefenses: OralDefense[]) {
    oralDefenses.sort((a, b) => a.number < b.number ? -1 : 1);
    this.oralDefenses = oralDefenses;
  }
}
