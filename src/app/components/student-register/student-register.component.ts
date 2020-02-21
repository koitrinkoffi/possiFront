import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {

  private formGroup: FormGroup;
  private users: User[] = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.users.push(new User(
      1,
      'Olivier',
      'BARAIS',
      'prof',
      'bof',
      'ok'
    ));
    this.formGroup = this.formBuilder.group({
      firstName: ['Celie', Validators.required],
      lastName: ['Rault', Validators.required],
      company: ['', Validators.required],
      tutorC: ['', Validators.required],
      tutorU: ['', Validators.required]
    });
  }
  private voir() {
    console.log(this.formGroup.value);
  }
}
