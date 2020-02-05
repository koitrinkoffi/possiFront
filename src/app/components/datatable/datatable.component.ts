import { Component, OnInit } from '@angular/core';
import {MDCDataTable} from '@material/data-table';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  constructor() { }
  private dataTable: any;
  ngOnInit() {
    this.dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
  }

}
