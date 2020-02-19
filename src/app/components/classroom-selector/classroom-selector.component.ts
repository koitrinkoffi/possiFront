import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {Classroom} from '../../model/classroom';

@Component({
  selector: 'app-classroom-selector',
  templateUrl: './classroom-selector.component.html',
  styleUrls: ['./classroom-selector.component.scss']
})
export class ClassroomSelectorComponent implements OnInit {
  private searchInput = '';
  private selectableChips = true;
  private removableChips = true;
  private separatorKeysCodes: number[] = [ENTER, COMMA];
  // private classroomCtrl = new FormControl();
  // private filteredClassroom: Observable<string[]>;
  private suggestedClassroom: Classroom[];
  private lemon: Classroom = new Classroom( 'Lemon', 1);
  private classrooms: Classroom[] = [];
  @Input()
  private allClassrooms: Classroom[] = [
    new Classroom('Apple', 2),
    this.lemon,
    new Classroom('Line', 4),
    new Classroom('Orange', 5),
    new Classroom('Strawberry', 6)];

  // @ViewChild('classroomInput', {static: false}) classroomInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit() {
    this.filterSuggestedClassroom();
  }

  private addClassroomByInput(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const classroom = this.allClassrooms.find(c => c.label == value);
    if (classroom == undefined) {
      this.addClassroom(new Classroom(value));
    } else {
      this.addClassroom(classroom);
    }

    if (input) {
      input.value = '';
    }
    this.searchInput = '';
    // this.classroomCtrl.setValue('');
  }

  private addClassroom(classroom: Classroom): void {
    const label = classroom.label.toLowerCase().trim();
    if ((this.classrooms.filter(c => c.label.toLowerCase().trim() === label).length === 0)) {
      this.classrooms.push(classroom);
      this.filterSuggestedClassroom();
    }
  }

  private removeClassroom(classroom: Classroom): void {
    const index = this.classrooms.indexOf(classroom);

    if (index >= 0) {
      this.classrooms.splice(index, 1);
      this.filterSuggestedClassroom();
    }
  }

  private classroomSelected(event: MatAutocompleteSelectedEvent): void {
    this.classrooms.push(this.allClassrooms.find(c => c.label === event.option.viewValue));
    this.filterSuggestedClassroom();
    this.searchInput = '';
  }

  private filterSuggestedClassroom() {
    this.suggestedClassroom = this.allClassrooms.filter(c => !this.classrooms.includes(c));
  }

  public parseData(classrooms: Classroom[]) {
    this.allClassrooms = classrooms;
    this.filterSuggestedClassroom();
  }

  public getClassroomToCreate(): Classroom[] {
    return this.classrooms.filter(c => !this.allClassrooms.includes(c));
  }

  public getClassroomSelected(): Classroom[] {
    return this.classrooms;
  }

}
