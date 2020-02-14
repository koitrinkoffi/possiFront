import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-classroom-selector',
  templateUrl: './classroom-selector.component.html',
  styleUrls: ['./classroom-selector.component.scss']
})
export class ClassroomSelectorComponent implements OnInit {


  private selectableChips = true;
  private removableChips = true;
  private separatorKeysCodes: number[] = [ENTER, COMMA];
  private classroomCtrl = new FormControl();
  private filteredClassroom: Observable<string[]>;
  private suggestedClassroom: string[];
  private classrooms: string[] = ['Lemon'];
  private allClassrooms: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('classroomInput', {static: false}) classroomInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredClassroom = this.classroomCtrl.valueChanges.pipe(
      startWith(null),
      map((classroom: string | null) => classroom ? this._filter(classroom) : this.allClassrooms.slice()));
  }

  ngOnInit() {
    this.filterSuggestedClassroom();
  }

  private addClassroomByInput(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    this.addClassroom(value);

    if (input) {
      input.value = '';
    }

    this.classroomCtrl.setValue(null);
  }

  private addClassroom(value: string): void {
    if ((value || '').trim()) {
      this.classrooms.push(value.trim());
      this.filterSuggestedClassroom();
    }
  }

  private removeClassroom(fruit: string): void {
    const index = this.classrooms.indexOf(fruit);

    if (index >= 0) {
      this.classrooms.splice(index, 1);
      this.filterSuggestedClassroom();
    }
  }

  private classroomSelected(event: MatAutocompleteSelectedEvent): void {
    this.classrooms.push(event.option.viewValue);
    this.classroomInput.nativeElement.value = '';
    this.classroomCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allClassrooms.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterSuggestedClassroom() {
    this.suggestedClassroom = this.allClassrooms.filter(c => !this.classrooms.includes(c));
  }
}
