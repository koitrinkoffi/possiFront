import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';
import {RoomService} from '../../services/room.service';
import {ClassroomSelectorComponent} from '../../components/classroom-selector/classroom-selector.component';
import {Planning} from '../../model/planning';
import * as $ from 'jquery';
import {PlanningService} from '../../services/planning.service';
import {showNotification} from '../../utils/notify';
import {ParticipantDatatableComponent} from '../../components/participant-datatable/participant-datatable.component';
import {Router} from '@angular/router';
import {MatHorizontalStepper, MatStep, MatVerticalStepper} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {OralDefense} from '../../model/oral-defense';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.scss']
})
export class CreatePlanningComponent implements OnInit, AfterViewInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  participants: OralDefense[] = [];
  participantsSelected: OralDefense[] = [];
  onLoading = false;
  onSubmitting = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private classroomService: RoomService,
              private planningService: PlanningService,
              private router: Router) {}

  @ViewChild('participantDatatableComponent', {static: false})
  participantDatatable: ParticipantDatatableComponent;

  @ViewChild('classroomSelector', {static: false})
  classroomSelector: ClassroomSelectorComponent;

  @ViewChild('inputFile', {static: false})
  inputFile: ElementRef;

  @ViewChild('roomStep', {static: false})
  roomStep: MatStep;

  @ViewChild('stepperV', {static: false})
  stepperV: MatVerticalStepper;

  @ViewChild('stepperH', {static: false})
  stepperH: MatHorizontalStepper;

  dateFilter = (d: Date | null): boolean => {
    const date = moment(d);
    const day = (d || new Date()).getDay();
    const today = moment(new Date());
    today.subtract(1, 'days');
    return date.isAfter(today) && (day !== 0 && day !== 6);
  }

  ngAfterViewInit(): void {
    this.fetchClassroom();
    this.roomStep.completed = false;
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

  validateDateRange(from: string, to: string): ValidatorFn {
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

  validateRooms(event: MouseEvent) {
    event.stopPropagation();
    if (this.classroomSelector.getClassroomSelected().length === 0 && this.classroomSelector.getClassroomToCreate().length === 0) {
      showNotification('Vous devez selectionner au moins une salle', 'danger');
      this.roomStep.completed = false;
    } else {
      this.roomStep.completed = true;
      if (this.isMobileMenu()) {
        this.stepperV.next();
      } else {
        this.stepperH.next();
      }
    }
  }

  isValidDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return !moment(control.value).isValid() ? {invalidDate: {value: control.value}} : null;
    };
  }

  // Todo Ajouter une fonction pour verifier horaire

  isValidHour(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Todo verifier la validation pour le format H:mm et H:m
      return !moment(control.value, 'H:m').isValid() ? {invalidHour: {value: control.value}} : null;
    };

  }

  fetchClassroom() {
    this.classroomService.getAll().subscribe(data => {
      this.classroomSelector.parseData(data);
    });
  }

  get startDate() {
    return this.secondFormGroup.get('startDate');
  }

  get endDate() {
    return this.secondFormGroup.get('endDate');
  }

  validate() {
    const nbDay = moment(this.secondFormGroup.get('endDate').value).diff(moment(this.secondFormGroup.get('startDate').value), 'days') + 1;
    const nbDayNeeded = Math.ceil((2 * this.participantsSelected.length)) / 16;
    if (nbDay >= nbDayNeeded) {
      showNotification('veuillez patienter un moment...', 'primary');
      // Planning
      const planning: Planning = new Planning();
      planning.name = this.title;
      planning.oralDefenseDuration = this.firstFormGroup.value.oralDefenseDuration;
      planning.admin = this.authService.user;
      planning.parsePeriod(this.secondFormGroup.value);
      planning.oralDefenses = this.participantsSelected;
      planning.rooms = this.classroomSelector.getClassroomSelected();

      // Room
      const classroomToCreate = this.classroomSelector.getClassroomToCreate();
      if (classroomToCreate.length > 0) {
        this.classroomService.create(classroomToCreate).subscribe(data => {
          planning.rooms = planning.rooms.concat(data);
          this.createPlanning(planning);
        }, error => {
          showNotification('Une erreur s\'est produite. Veuillez réessayer plus tard', 'danger');
        });
      } else {
        this.createPlanning(planning);
      }
    } else {
      showNotification('Vous avez plus de soutenances que de créneaux veuillez allonger la periode des soutenances', 'danger');
    }
  }

  createPlanning(planning: Planning) {
    planning.rooms = this.classroomSelector.getClassroomSelected();
    this.planningService.create(planning).subscribe(data => {
      showNotification('Votre planning a été créé avec succès', 'success');
      setTimeout(() => {
        this.router.navigate(['/planning/' + data.id]);
      }, 1000);
    },  error => {
      showNotification('Une erreur s\'est produite', 'danger');
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.onLoading = true;
      this.planningService.uploadFile(file).subscribe(response => {
        this.participants = response.data;
        response.errors.forEach(e => {
          showNotification(e.typeError, 'danger');
        }, (e) => {
          this.onLoading = false;
          showNotification('Une erreur est survenue durant l\'importation. Vérifiez bien le fichier que vous importer', 'danger');
        });
        this.onLoading = false;
      });
    }
  }

  isMobileMenu() {
    return !($(window).width() > 991);
  }

  onParticipantChange(data) {
    this.participantsSelected = this.participants.filter(p => data.find(d => d.email === p.student.email));
  }

  get title() {
    return this.firstFormGroup.get('title').value;
  }

  validateTitle(event: MouseEvent) {
    event.stopPropagation();
    this.planningService.findByName(this.title).subscribe(p => {
      if (p === null) {
        this.firstFormGroup.get('title').setErrors(null);
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
