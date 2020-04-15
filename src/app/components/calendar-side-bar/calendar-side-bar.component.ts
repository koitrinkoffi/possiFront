import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OralDefense} from '../../model/oral-defense';
import {OralDefenseUserPipe} from '../../filters/oral-defense-user.pipe';
import {OralDefenseSearchPipe} from '../../filters/oral-defense-search.pipe';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-calendar-side-bar',
  templateUrl: './calendar-side-bar.component.html',
  styleUrls: ['./calendar-side-bar.component.scss']
})
export class CalendarSideBarComponent implements OnInit {

  panelOpenState = false;
  private oralDefenses: OralDefense[];
  private search: string;
  private ownOralDefenses = true;
  private otherOraDefenses = true;
  @Output()
  private oralDefenseSelected = new EventEmitter<OralDefense[]>();
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  parseOralDefense(oralDefenses: OralDefense[]) {
    oralDefenses.sort((a, b) => a.number < b.number ? -1 : 1);
    this.oralDefenses = oralDefenses;
    this.updateOralDefenseToShow();
  }

  private updateOralDefenseToShow() {
    if (this.search === undefined || this.search === '') {
      if (this.ownOralDefenses && this.otherOraDefenses) {
        this.oralDefenseSelected.emit(this.oralDefenses);
      } else if (this.ownOralDefenses) {
        this.oralDefenseSelected.emit(new OralDefenseUserPipe().transform(this.oralDefenses, this.authService.user.uid, true));
      } else if (this.otherOraDefenses) {
        this.oralDefenseSelected.emit(new OralDefenseUserPipe().transform(this.oralDefenses, this.authService.user.uid, false));
      } else {
        this.oralDefenseSelected.emit([]);
      }
    } else {
        this.oralDefenseSelected.emit(new OralDefenseSearchPipe().transform(this.oralDefenses, this.search));
    }
  }


}
