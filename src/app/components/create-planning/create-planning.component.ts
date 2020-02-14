import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonDatatableComponent} from '../person-datatable/person-datatable.component';
import {User} from '../../model/user';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.scss']
})
export class CreatePlanningComponent implements OnInit, AfterViewInit {

  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  @ViewChild('datatable', {static: false}) private personDatatable: PersonDatatableComponent;
  private dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startDay: ['', Validators.required],
      endDay: ['', Validators.required],
      startBreak: ['', Validators.required],
      endBreak: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.personDatatable.parseData([new User('Oclean', 'Master', 'Super codeur', 'ok', 'email')])
  }
}
