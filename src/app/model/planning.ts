import {User} from './user';
import {Room} from './room';
import {TimeBox} from './time-box';
import * as moment from 'moment';
import {OralDefense} from './oral-defense';

export class Planning {
  period: TimeBox;
  id: number;
  name: string;
  admin: User;
  oralDefenseDuration: number|string;
  defaultRevision: Planning;
  nbMaxOralDefensePerDay: number;
  oralDefenseInterlude = 0;
  oralDefenses: OralDefense[];
  rooms: Room[];
  lunchBreak: TimeBox;
  dayPeriod: TimeBox;
  revisions: Planning[];
  createdAt: string;
  generated: boolean;
  newUnavailabilities: boolean;
  updatedAt: string;


  static dateFormat(): string {
    return 'DD/MM/YYYY';
  }

  parsePeriod(ob) {
    this.period = new TimeBox(moment(ob.startDate).format(), moment(ob.endDate).format());

    // lunchBreak
    let params = moment(ob.startDate);
    params.hour(moment(ob.startBreak, 'HH:mm').hour());
    params.minute(moment(ob.startBreak, 'HH:mm').minute());
    params.set({second: 0, millisecond: 0});
    this.lunchBreak = new TimeBox(params.format());
    params.hour(moment(ob.endBreak, 'HH:mm').hour());
    params.minute(moment(ob.endBreak, 'HH:mm').minute());
    params.set({second: 0, millisecond: 0});
    this.lunchBreak.to = params.format();

    // dayPeriod
    params = moment(ob.startDate);
    params.hour(moment(ob.startDay, 'HH:mm').hour());
    params.minute(moment(ob.startDay, 'HH:mm').minute());
    params.set({second: 0, millisecond: 0});
    this.dayPeriod = new TimeBox(params.format());
    params.hour(moment(ob.endDay, 'HH:mm').hour());
    params.minute(moment(ob.endDay, 'HH:mm').minute());
    params.set({second: 0, millisecond: 0});
    this.dayPeriod.to = params.format();
  }

}

