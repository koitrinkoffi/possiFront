import {User} from './user';
import {Classroom} from './classroom';
import {TimeBox} from './time-box';
import * as moment from 'moment';
import {Participant} from './participant';
import {OralDefense} from './oral-defense';

export class Planning {
  period: TimeBox;
  id: number;
  name: string;
  admin: User;
  oralDefenseDuration: string;
  oralDefenseInterlude = '10';
  oralDefenses: OralDefense[];
  rooms: Classroom[];
  participants: Participant[];
  lunchBreak: TimeBox;
  dayPeriod: TimeBox;


  static dateFormat(): string {
    return 'DD/MM/YYYY';
  }

  parsePeriod(ob) {
    this.period = new TimeBox(moment(ob.startDate).format(), moment(ob.endDate).format());

    // lunchBreak
    let params = moment(ob.startDate);
    params.hour(moment(ob.startBreak, 'HH:mm').hour());
    params.minute(moment(ob.startBreak, 'HH:mm').minute());
    this.lunchBreak = new TimeBox(params.format());
    params.hour(moment(ob.endBreak, 'HH:mm').hour());
    params.minute(moment(ob.endBreak, 'HH:mm').minute());
    this.lunchBreak.to = params.format();

    // dayPeriod
    params = moment(ob.startDate);
    params.hour(moment(ob.startDay, 'HH:mm').hour());
    params.minute(moment(ob.startDay, 'HH:mm').minute());
    this.dayPeriod = new TimeBox(params.format());
    params.hour(moment(ob.endDay, 'HH:mm').hour());
    params.minute(moment(ob.endDay, 'HH:mm').minute());
    this.dayPeriod.to = params.format();
  }

}

