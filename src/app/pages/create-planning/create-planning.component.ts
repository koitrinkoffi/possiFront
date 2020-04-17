import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';
import {RoomService} from '../../services/room.service';
import {ClassroomSelectorComponent} from '../../components/classroom-selector/classroom-selector.component';
import {Planning} from '../../model/planning';
import * as $ from 'jquery';
import {PlanningService} from '../../services/planning.service';
import {showNotification} from '../../utils/notify';
import {ParticipantService} from '../../services/participant.service';
import {Participant} from '../../model/participant';
import {ParticipantDatatableComponent} from '../../components/participant-datatable/participant-datatable.component';
import {Router} from '@angular/router';
import {MatHorizontalStepper, MatStepper, MatVerticalStepper} from '@angular/material';
import {AuthService} from '../../services/auth.service';

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
  private participantsSelected: Participant[] = [];
  private onLoading = false;
  private onSubmitting = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private classroomService: RoomService,
              private planningService: PlanningService,
              private participantService: ParticipantService,
              private router: Router) {}

  @ViewChild('participantDatatableComponent', {static: false})
  private participantDatatable: ParticipantDatatableComponent;

  @ViewChild('classroomSelector', {static: false})
  private classroomSelector: ClassroomSelectorComponent;

  @ViewChild('inputFile', {static: false})
  private inputFile: ElementRef;

  @ViewChild('stepperV', {static: false})
  private stepperV: MatVerticalStepper;

  @ViewChild('stepperH', {static: false})
  private stepperH: MatHorizontalStepper;

  private dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  ngAfterViewInit(): void {
    this.fetchClassroom();
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
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
      planning.name = this.title;
      planning.oralDefenseDuration = this.firstFormGroup.value.oralDefenseDuration;
      planning.admin = this.authService.user;
      planning.parsePeriod(this.secondFormGroup.value);
      planning.participants = this.participantsSelected;
      planning.rooms = this.classroomSelector.getClassroomSelected();

      // Room
      const classroomToCreate = this.classroomSelector.getClassroomToCreate();
      if (classroomToCreate.length > 0) {
        this.classroomService.create(classroomToCreate).subscribe(data => {
          planning.rooms = planning.rooms.concat(data);
          this.createPlanning(planning);
        }, error => {
          console.error(error);
        });
      } else {
        this.createPlanning(planning);
      }
  }

  private createPlanning(planning: Planning) {
    planning.rooms = this.classroomSelector.getClassroomSelected();
    this.planningService.create(planning).subscribe(data => {
    },  error => {
      console.error(error);
    });
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

  private onParticipantChange(data) {
    this.participantsSelected = this.participants.filter(p => data.find(d => d.email === p.student.email));
  }

  private get title() {
    return this.firstFormGroup.get('title').value;
  }

  private validateTitle(event: MouseEvent) {
    event.stopPropagation();
    this.planningService.findByName(this.title).subscribe(p => {
      if (p === null) {
        if (this.isMobileMenu()) {
          this.stepperV.next();
        } else {
          this.stepperH.next();
        }
      } else {
        this.firstFormGroup.get('title').setErrors({error: 'Ce titre est déjà utilisé'});
      }
    });
  }
}
