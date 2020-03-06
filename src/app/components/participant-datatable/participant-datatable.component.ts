import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {User} from '../../model/user';
import {Participant} from '../../model/participant';


export interface ParticipantElement {
  id: number;
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

  private participantElements: ParticipantElement[];
  @Input()
  private participants: Participant[] = [];
  @Input()
  private title: string;
  @Input()
  private subtitle = '';
  private displayedColumns: string[] = ['select', 'student', 'followingTeacher', 'tutorFullName', 'company'];
  private dataSource: MatTableDataSource<ParticipantElement>;
  private selection = new SelectionModel<ParticipantElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) private sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ParticipantElement>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.parseData(this.participants);
  }

  private applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  private isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  private masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  private checkboxLabel(row?: ParticipantElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  parseData(participants: Participant[]): void {
    this.participantElements = [];
    participants.forEach(p => {
      this.participantElements.push({
        id: p.id,
        student: p.student.firstName + ' ' + p.student.lastName,
        followingTeacher: p.followingTeacher.firstName + ' ' + p.followingTeacher.lastName,
        tutorFullName: p.tutorFullName,
        company: p.company,
      });
    });
    this.dataSource.data = this.participantElements;
  }

  getPersonSelected(): number[] {
    const ids: number[] = [];
    this.selection.selected.forEach(p => {
      ids.push(p.id);
    });
    return ids;
  }

}
