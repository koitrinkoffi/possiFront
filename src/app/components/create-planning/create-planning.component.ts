import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {PersonDatatableComponent} from '../person-datatable/person-datatable.component';
import {User} from '../../model/user';
import * as moment from 'moment';
import {error} from 'util';
import {UserService} from '../../services/user.service';
import {ClassroomService} from '../../services/classroom.service';
import {Classroom} from '../../model/classroom';
import {ClassroomSelectorComponent} from '../classroom-selector/classroom-selector.component';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.scss']
})
export class CreatePlanningComponent implements OnInit, AfterViewInit {

  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;
  private teachers: User[] = [];
  private classrooms: Classroom[] = [];

  constructor(private _formBuilder: FormBuilder, private userService: UserService, private classroomService: ClassroomService) {}

  @ViewChild('datatable', {static: false})
  private personDatatable: PersonDatatableComponent;
  @ViewChild('classroomSelector', {static: false})
  private classroomSelector: ClassroomSelectorComponent;

  private dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  ngOnInit() {
    this.fetchClassroom();

    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      startDate: ['', [Validators.required, this.isValidDate()]],
      endDate: ['', [Validators.required, this.isValidDate()]],
      startDay: ['', [Validators.required, this.isValidHour()]],
      endDay: ['', [Validators.required, this.isValidHour()]],
      startBreak: ['', [Validators.required, this.isValidHour()]],
      endBreak: ['', [Validators.required, this.isValidHour()]],
    }, {
      validators: [this.validateDateRange('startDate', 'endDate')]
    });
  }

  ngAfterViewInit(): void {
    this.fetchTeacher();
  }

  private validateDateRange(from: string, to: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
      const f = group.controls[from];
      const t = group.controls[to];
      if (f.value > t.value) {
        const rangeError = {
          dateRange: 'La date de début peut pas être plus grande que la date de fin'
        };
        t.setErrors(rangeError);
        return rangeError;
      }
      return {};
    };
  }

  private isValidDate(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return !moment(control.value).isValid() ? {invalidDate: {value: control.value}} : null;
    };
  }

  private isValidHour(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return !moment(control.value, 'HH:mm').isValid() ? {invalidHour: {value: control.value}} : null;
    };

  }

  private fetchTeacher() {
    this.userService.getUsers().subscribe(data => {
      data.forEach(u => {
        this.teachers.push(new User(
          u.id,
          u.firstName,
          u.lastName,
          u.role,
          u.uid,
          u.email
        ));
      });
      // debugger;
      this.personDatatable.parseData(this.teachers);
    });
  }
  private fetchClassroom() {
    this.classroomService.getAll().subscribe(data => {
      data.forEach(c => {
        this.classrooms.push(new Classroom(c.name, c.id));
      });
        this.classroomSelector.parseData(this.classrooms);
    });
  }
  get startDate() { return this.secondFormGroup.get('startDate'); }
  get endDate() { return this.secondFormGroup.get('endDate'); }
}
