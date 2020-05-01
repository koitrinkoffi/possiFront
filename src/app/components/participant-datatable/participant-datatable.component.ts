import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {OralDefense} from '../../model/oral-defense';


export interface ParticipantElement {
  email: string;
  student: string;
  followingTeacher: string;
  tutorFullName: string;
  company: string;
}
@Component({
  selector: 'app-participant-datatable',
  templateUrl: './participant-datatable.component.html',
  styleUrls: ['./participant-datatable.component.scss']
})
export class ParticipantDatatableComponent implements OnInit {

  participantElements: ParticipantElement[];
  @Input()
  participants: OralDefense[] = [];
  @Input()
  title: string;
  @Input()
  subtitle = '';
  @Output()
  selectionListener = new EventEmitter<ParticipantElement[]>();

  displayedColumns: string[] = ['select', 'student', 'followingTeacher', 'tutorFullName', 'company'];
  dataSource: MatTableDataSource<ParticipantElement>;
  selection = new SelectionModel<ParticipantElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ParticipantElement>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.parseData(this.participants);
    this.selection.changed.asObservable().subscribe(data => {
     this.selectionListener.emit(this.selection.selected);
    });
  }

  applyFilter(filterValue: string) {
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
  checkboxLabel(row?: ParticipantElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.student + 1}`;
  }

  parseData(participants: OralDefense[]): void {
    this.participantElements = [];
    participants.forEach(p => {
      this.participantElements.push({
        email: p.student.email,
        student: p.student.firstName + ' ' + p.student.lastName,
        followingTeacher: p.followingTeacher.firstName + ' ' + p.followingTeacher.lastName,
        tutorFullName: p.tutorFullName,
        company: p.company,
      });
    });
    this.dataSource.data = this.participantElements;
  }

}
