import {User} from './user';
import {Classroom} from './classroom';
import {TimeBox} from './time-box';
import * as moment from 'moment';
import {Participant} from './participant';

export class Planning {
  period: TimeBox;
  id: number;
  name: string;
  admin: User;
  oralDefenseDuration: number|string;
  nbMaxOralDefensePerDay: number;
  oralDefenseInterlude = '10';
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
    this.lunchBreak = new TimeBox(params.format('x'));
    params.hour(moment(ob.endBreak, 'HH:mm').hour());
    params.minute(moment(ob.endBreak, 'HH:mm').minute());
    this.lunchBreak.to = params.format('x');

    // dayPeriod
    params = moment(ob.startDate);
    params.hour(moment(ob.startDay, 'HH:mm').hour());
    params.minute(moment(ob.startDay, 'HH:mm').minute());
    this.dayPeriod = new TimeBox(params.format('x'));
    params.hour(moment(ob.endDay, 'HH:mm').hour());
    params.minute(moment(ob.endDay, 'HH:mm').minute());
    this.dayPeriod.to = params.format('x');
  }

}

