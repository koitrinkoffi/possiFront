import {User} from './user';

export class Planning {
  private _title: string;
  private _admin: User;
  private _startDate: string;
  private _endDate: string;
  private _id: string;


  constructor(title: string, admin: User, startDate: string, endDate: string) {
    this._title = title;
    this._admin = admin;
    this._startDate = startDate;
    this._endDate = endDate;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get admin(): User {
    return this._admin;
  }

  set admin(value: User) {
    this._admin = value;
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(value: string) {
    this._endDate = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}

