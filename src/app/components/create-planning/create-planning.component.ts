import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';
import {UserService} from '../../services/user.service';
import {ClassroomService} from '../../services/classroom.service';
import {Classroom} from '../../model/classroom';
import {ClassroomSelectorComponent} from '../classroom-selector/classroom-selector.component';
import {Planning} from '../../model/planning';
import * as $ from 'jquery';
import {PlanningService} from '../../services/planning.service';
import {showNotification} from '../../utils/notify';
import {ParticipantService} from '../../services/participant.service';
import {Participant} from '../../model/participant';
import {ParticipantDatatableComponent} from '../participant-datatable/participant-datatable.component';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.scss']
})
export class CreatePlanningComponent implements OnInit, AfterViewInit {

  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;
  private thirdFormGroup: FormGroup;
  private participants: Participant[] = [];
  private onLoading = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private classroomService: ClassroomService,
              private planningService: PlanningService,
              private participantService: ParticipantService) {}

  @ViewChild('participantDatatableComponent', {static: false})
  private participantDatatable: ParticipantDatatableComponent;

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
      title: ['fuck', Validators.required],
      oralDefenseDuration: ['60', [Validators.required, Validators.min(0)]]
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
    this.thirdFormGroup = this.formBuilder.group({
      file: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    // this.fetchTeacher();
    // showNotification('Merde !', 'danger');
    // showNotification('Coronavirus !!!!!!!!', 'success');
  }

  private validateDateRange(from: string, to: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const toInput = group.controls[to];

      const f = moment(group.controls[from].value);
      const t = moment(toInput.value);

      if (!f.isSameOrBefore(t) || !t.isSameOrAfter(f)) {
        const rangeError = {
          dateRange: 'La date de début peut pas être plus grande que la date de fin'
        };
        toInput.setErrors(rangeError);
        return rangeError;
      }
      toInput.setErrors(null);
      return {};
    };
  }

  private isValidDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return !moment(control.value).isValid() ? {invalidDate: {value: control.value}} : null;
    };
  }

  // Todo Ajouter une fonction pour verifier horaire

  private isValidHour(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Todo verifier la validation pour le format H:mm et H:m
      return !moment(control.value, 'H:m').isValid() ? {invalidHour: {value: control.value}} : null;
    };

  }

  private fetchClassroom() {
    this.classroomService.getAll().subscribe(data => {
      this.classroomSelector.parseData(data);
    });
  }

  private get startDate() {
    return this.secondFormGroup.get('startDate');
  }

  private get endDate() {
    return this.secondFormGroup.get('endDate');
  }

  private validate() {
    // Planning
    const planning: Planning = new Planning();
    planning.name = this.firstFormGroup.value.title;
    planning.oralDefenseDuration = this.firstFormGroup.value.oralDefenseDuration;
    planning.admin = this.userService.user;
    planning.parsePeriod(this.secondFormGroup.value);

    // Classroom
    const classroomToCreate = this.classroomSelector.getClassroomToCreate();
    if (classroomToCreate.length > 0) {
      this.classroomService.create(classroomToCreate).subscribe( data => {
        planning.rooms = this.classroomSelector.getClassroomSelected();
        this.planningService.createPlanning(planning);
      });
    } else {
      planning.rooms = this.classroomSelector.getClassroomSelected();
      this.planningService.createPlanning(planning).subscribe(data => {
        console.log(data);
      });
    }

  }

  private onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.onLoading = true;
      this.participantService.uploadFile(file).subscribe(response => {
        this.participants = response.data;
        response.errors.forEach(e => {
          showNotification(e.typeError, 'danger');
        });
        this.onLoading = false;
      });
    }
  }

  private isMobileMenu() {
    return !($(window).width() > 991);
  }

  private get title() {
    return this.firstFormGroup.get('title').value;
  }
}
