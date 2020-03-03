import * as moment from 'moment';

export class Unvailability {
  private _id: number|string;
  private _userId: number|string;
  private _planningId: number|string;
  private _periodFrom: string;
  private _periodTo: string;
  private _available: boolean;


  constructor(userId: number | string, planningId: number | string, periodFrom: string, periodTo: string, available: boolean, id?: number | string) {
    this._id = id;
    this._userId = userId;
    this._planningId = planningId;
    this._periodFrom = periodFrom;
    this._periodTo = periodTo;
    this._available = available;
  }

  get periodFrom(): string {
    return this._periodFrom;
  }

  set periodFrom(value: string) {
    this._periodFrom = value;
  }

  get periodTo(): string {
    return this._periodTo;
  }

  set periodTo(value: string) {
    this._periodTo = value;
  }

  get id(): number | string {
    return this._id;
  }

  set id(value: number | string) {
    this._id = value;
  }

  get userId(): number | string {
    return this._userId;
  }

  set userId(value: number | string) {
    this._userId = value;
  }

  get planningId(): number | string {
    return this._planningId;
  }

  set planningId(value: number | string) {
    this._planningId = value;
  }

  get available(): boolean {
    return this._available;
  }

  set available(value: boolean) {
    this._available = value;
  }

  getPeriodToFormated(format: string): string {
    return moment(this.periodTo).format(format);
  }

  getPeriodFromFormated(format: string): string {
    return moment(this.periodFrom).format(format);
  }
}
