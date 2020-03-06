import {User} from './user';

export class Participant {
  private _student: User;
  private _followingTeacher: User;
  private _tutorFullName: string;
  private _company: string;
  private _id: number;


  constructor(student: User, followingTeacher: User, tutorFullName: string, company: string, id?: number) {
    this._student = student;
    this._followingTeacher = followingTeacher;
    this._tutorFullName = tutorFullName;
    this._company = company;
    this._id = id;
  }

  get student(): User {
    return this._student;
  }

  set student(value: User) {
    this._student = value;
  }

  get followingTeacher(): User {
    return this._followingTeacher;
  }

  set followingTeacher(value: User) {
    this._followingTeacher = value;
  }

  get tutorFullName(): string {
    return this._tutorFullName;
  }

  set tutorFullName(value: string) {
    this._tutorFullName = value;
  }

  get company(): string {
    return this._company;
  }

  set company(value: string) {
    this._company = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
