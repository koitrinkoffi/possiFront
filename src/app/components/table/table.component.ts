import {Component, Input, OnInit} from '@angular/core';

export interface TabHeader {
  label: string;
  icon: string;
  first: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  private headers: TabHeader[] = [];
  constructor() { }

  ngOnInit() {
    if (this.headers.length !== 0) {
      this.headers[0].first = true;
    }
  }

  private toggleActiveHeader(header: TabHeader) {
    this.headers.find(h => h.first).first = false;
    header.first = true;
  }

}
