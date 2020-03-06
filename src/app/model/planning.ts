import {User} from './user';
import {Classroom} from './classroom';

export class Planning {

  private _title: string;
  private _creator: User;
  private _startDate: string;
  private _endDate: string;
  private _id: number|string;
  private _startBreak: string;
  private _endBreak: string;
  private _startDay: string;
  private _endDay: string;
  private _oralDefenseDuration: string;
  private oralDefenseInterlude = '10';
  private state: string;
  private _classrooms: Classroom[];

  constructor(id?: string, title?: string, startDate?: string, endDate?: string, admin?: User) {
    this._title = title;
    if (admin !== undefined) {
      this._creator = admin;
    }
    this._startDate = startDate;
    this._endDate = endDate;
    this._id = id;
  }

  get endDay(): string {
    return this._endDay;
  }

  set endDay(value: string) {
    this._endDay = value;
  }
  get startDay(): string {
    return this._startDay;
  }

  set startDay(value: string) {
    this._startDay = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get creator(): User {
    return this._creator;
  }

  set creator(value: User) {
    this._creator = value;
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

  get id(): string|number {
    return this._id;
  }

  set id(value: string|number) {
    this._id = value;
  }

  get endBreak(): string {
    return this._endBreak;
  }

  set endBreak(value: string) {
    this._endBreak = value;
  }
  get startBreak(): string {
    return this._startBreak;
  }

  set startBreak(value: string) {
    this._startBreak = value;
  }
  get oralDefenseDuration(): string {
    return this._oralDefenseDuration;
  }

  set oralDefenseDuration(value: string) {
    this._oralDefenseDuration = value;
  }
  get classrooms(): Classroom[] {
    return this._classrooms;
  }

  set classrooms(value: Classroom[]) {
    this._classrooms = value;
  }

  static dateFormat(): string {
    return 'DD/MM/YYYY';
  }

  parse(ob: Partial<Planning>) {
    Object.assign(this, ob);
  }

  getRequestData(): any {
    return {
      dayPeriodStart: this.startDay,
      dayPeriodEnd: this.endDay,
      lunchBreakEnd: this.endBreak,
      lunchBreakStart: this.startBreak,
      name: this.title,
      nbMaxOralDefensePerDay: '',
      oralDefenseDuration: this.oralDefenseDuration,
      oralDefenseInterlude: this.oralDefenseInterlude,
      periodEnd: this.endDate,
      periodStart: this.startDate,
      rooms: this.classrooms,
      etat: this.state
    };
  }
}

