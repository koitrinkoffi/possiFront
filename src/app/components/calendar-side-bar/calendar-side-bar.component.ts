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
  private nbOwnOralDefenses = 0;
  private otherOraDefenses = true;
  private nbOtherOraDefenses = 0;
  @Output()
  private oralDefenseSelected = new EventEmitter<OralDefense[]>();
  private nbSearch = 0;
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
      const own = new OralDefenseUserPipe().transform(this.oralDefenses, this.authService.user.uid, true);
      const other = new OralDefenseUserPipe().transform(this.oralDefenses, this.authService.user.uid, false);
      this.nbOwnOralDefenses = own.length;
      this.nbOtherOraDefenses = other.length;
      if (this.ownOralDefenses && this.otherOraDefenses) {
        this.oralDefenseSelected.emit(this.oralDefenses);
      } else if (this.ownOralDefenses) {
        this.oralDefenseSelected.emit(own);
      } else if (this.otherOraDefenses) {
        this.oralDefenseSelected.emit(other);
      } else {
        this.oralDefenseSelected.emit([]);
      }
    } else {
      const search = new OralDefenseSearchPipe().transform(this.oralDefenses, this.search);
      this.nbSearch = search.length;
        this.oralDefenseSelected.emit(search);
    }
  }


}
