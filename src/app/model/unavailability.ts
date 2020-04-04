import * as moment from 'moment';
import {User} from './user';
import {TimeBox} from './time-box';

export class Unavailability {

  constructor(person: User, period: TimeBox, id?: number) {
    this.person = person;
    this.period = period;
    this.id = id;
  }

  id: number;
  person: User;
  period: TimeBox;
}
