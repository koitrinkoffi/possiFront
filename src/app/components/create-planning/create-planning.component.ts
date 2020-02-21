import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {PersonDatatableComponent} from '../person-datatable/person-datatable.component';
import {User} from '../../model/user';
import * as moment from 'moment';
import {UserService} from '../../services/user.service';
import {ClassroomService} from '../../services/classroom.service';
import {Classroom} from '../../model/classroom';
import {ClassroomSelectorComponent} from '../classroom-selector/classroom-selector.component';
import {Planning} from '../../model/planning';
import * as $ from 'jquery';
import {PlanningService} from '../../services/planning.service';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.scss']
})
export class CreatePlanningComponent implements OnInit, AfterViewInit {

  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;
  private teachers: User[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private classroomService: ClassroomService, private planningService: PlanningService) {}

  @ViewChild('datatable', {static: false})
  private personDatatable: PersonDatatableComponent;
  @ViewChild('classroomSelector', {static: false})
  private classroomSelector: ClassroomSelectorComponent;
  @ViewChild('inputFile', {static: false})
  private inputFile: ElementRef;

  private dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  ngOnInit() {
    this.fetchClassroom();
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      oralDefenseDuration: ['40', [Validators.required, Validators.min(0)]]
    });
    this.secondFormGroup = this.formBuilder.group({
      startDate: [moment(new Date()).format(), [Validators.required,  this.isValidDate()]],
      endDate: [moment(new Date()).format(), [Validators.required,  this.isValidDate()]],
      startDay: ['08:00', [Validators.required,  Validators.pattern('[0-9]{2}:[0-9]{2}'), this.isValidHour()]],
      endDay: ['18:00', [Validators.required,  Validators.pattern('[0-9]{2}:[0-9]{2}'), this.isValidHour()]],
      startBreak: ['12:00', [Validators.required,  Validators.pattern('[0-9]{2}:[0-9]{2}'), this.isValidHour()]],
      endBreak: ['14:00', [Validators.required,  Validators.pattern('[0-9]{2}:[0-9]{2}'), this.isValidHour()]],
    }, {
      validators: [this.validateDateRange('startDate', 'endDate')]
    });
  }

  ngAfterViewInit(): void {
    this.fetchTeacher();
    console.log(this.inputFile);
  }

  private validateDateRange(from: string, to: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
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
    return (control: AbstractControl): { [key: string]: any } | null => {
      return !moment(control.value).isValid() ? {invalidDate: {value: control.value}} : null;
    };
  }

  private isValidHour(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
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
      this.personDatatable.parseData(this.teachers);
    });
  }

  private fetchClassroom() {
    this.classroomService.getAll().subscribe(data => {
      const classrooms: Classroom[] = [];
      data.forEach(c => {
        classrooms.push(new Classroom(c.name, c.id));
      });
      this.classroomSelector.parseData(classrooms);
    });
  }

  private get startDate() {
    return this.secondFormGroup.get('startDate');
  }

  private get endDate() {
    return this.secondFormGroup.get('endDate');
  }

  private validate() {
    const planning: Planning = new Planning();
    planning.parse(this.firstFormGroup.value);
    planning.parse(this.secondFormGroup.value);
    planning.classrooms = this.classroomSelector.getClassroomSelected();
    this.classroomService.create(this.classroomSelector.getClassroomToCreate()).subscribe( data => {
      // this.planningService.createPlanning(planning, )
    });
    // this.classroomSelector
  }

  private isMobileMenu() {
    return !($(window).width() > 991);
  }

}
