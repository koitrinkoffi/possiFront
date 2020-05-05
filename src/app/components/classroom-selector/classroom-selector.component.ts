import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Room} from '../../model/room';

@Component({
  selector: 'app-classroom-selector',
  templateUrl: './classroom-selector.component.html',
  styleUrls: ['./classroom-selector.component.scss']
})
export class ClassroomSelectorComponent implements OnInit {
  selectableChips = true;
  removableChips = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  suggestedClassroom: Room[];
  searchInput = '';
  classrooms: Room[] = [];
  @Input()
  allClassrooms: Room[] = [];

  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit() {
    this.filterSuggestedClassroom();
  }

  addClassroomByInput(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value.trim() !== '') {
      const classroom = this.allClassrooms.find(c => c.name === value);
      if (classroom === undefined) {
        this.addClassroom(new Room(value));
      } else {
        this.addClassroom(classroom);
      }
    }

    if (input) {
      input.value = '';
    }
    this.searchInput = '';
  }

  addClassroom(classroom: Room): void {
    const label = classroom.name.toLowerCase().trim();
    if ((this.classrooms.filter(c => c.name.toLowerCase().trim() === label).length === 0)) {
      this.classrooms.push(classroom);
      this.filterSuggestedClassroom();
    }
  }

  removeClassroom(classroom: Room): void {
    const index = this.classrooms.indexOf(classroom);

    if (index >= 0) {
      this.classrooms.splice(index, 1);
      this.filterSuggestedClassroom();
    }
  }

  classroomSelected(event: MatAutocompleteSelectedEvent): void {
    this.classrooms.push(this.allClassrooms.find(c => c.name === event.option.viewValue));
    this.filterSuggestedClassroom();
    this.searchInput = '';
  }

  filterSuggestedClassroom() {
    this.suggestedClassroom = this.allClassrooms.filter(c => !this.classrooms.includes(c));
  }

  parseData(classrooms: Room[]) {
    this.allClassrooms = classrooms;
    this.filterSuggestedClassroom();
  }

  getClassroomToCreate(): Room[] {
    return this.classrooms.filter(c => !this.allClassrooms.includes(c));
  }

  getClassroomSelected(): Room[] {
    return this.classrooms.filter(c => !this.getClassroomToCreate().includes(c));
  }
}
