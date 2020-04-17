import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {Room} from '../../model/room';

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
  private suggestedClassroom: Room[];
  private lemon: Room = new Room( 'i50', 1);
  private classrooms: Room[] = [];
  @Input()
  private allClassrooms: Room[] = [
    new Room('e210', 2),
    this.lemon,
    new Room('i52', 4),
    new Room('i54', 5),
    new Room('i53', 6)];

  // @ViewChild('classroomInput', {static: false}) classroomInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit() {
    this.filterSuggestedClassroom();
  }

  private addClassroomByInput(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const classroom = this.allClassrooms.find(c => c.name == value);
    if (classroom == undefined) {
      this.addClassroom(new Room(value));
    } else {
      this.addClassroom(classroom);
    }

    if (input) {
      input.value = '';
    }
    this.searchInput = '';
    // this.classroomCtrl.setValue('');
  }

  private addClassroom(classroom: Room): void {
    const label = classroom.name.toLowerCase().trim();
    if ((this.classrooms.filter(c => c.name.toLowerCase().trim() === label).length === 0)) {
      this.classrooms.push(classroom);
      this.filterSuggestedClassroom();
    }
  }

  private removeClassroom(classroom: Room): void {
    const index = this.classrooms.indexOf(classroom);

    if (index >= 0) {
      this.classrooms.splice(index, 1);
      this.filterSuggestedClassroom();
    }
  }

  private classroomSelected(event: MatAutocompleteSelectedEvent): void {
    this.classrooms.push(this.allClassrooms.find(c => c.name === event.option.viewValue));
    this.filterSuggestedClassroom();
    this.searchInput = '';
  }

  private filterSuggestedClassroom() {
    this.suggestedClassroom = this.allClassrooms.filter(c => !this.classrooms.includes(c));
  }

  public parseData(classrooms: Room[]) {
    this.allClassrooms = classrooms;
    this.filterSuggestedClassroom();
  }

  public getClassroomToCreate(): Room[] {
    return this.classrooms.filter(c => !this.allClassrooms.includes(c));
  }

  public getClassroomSelected(): Room[] {
    return this.classrooms.filter(c => !this.getClassroomToCreate().includes(c));
  }

}
