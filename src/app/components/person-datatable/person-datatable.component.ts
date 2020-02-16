import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Planning} from '../../model/planning';
import {User} from '../../model/user';
import {SelectionModel} from '@angular/cdk/collections';

export interface PersonElement {
  id: number;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-person-datatable',
  templateUrl: './person-datatable.component.html',
  styleUrls: ['./person-datatable.component.scss']
})
export class PersonDatatableComponent implements OnInit {

  private personElements: PersonElement[];
  @Input()
  private displayedColumns: string[] = ['select', 'uid', 'firstname', 'lastname', 'email', 'role'];
  private dataSource: MatTableDataSource<PersonElement>;
  private selection = new SelectionModel<PersonElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) private sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PersonElement>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PersonElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.uid + 1}`;
  }

  parseData(users: User[]): void {
    this.personElements = [];
    users.forEach(u => {
      this.personElements.push({
        id: u.id,
        uid: u.uid,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role
      });
    });
    this.dataSource.data = this.personElements;
  }

}
