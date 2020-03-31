import * as moment from 'moment';
import {User} from './user';
import {TimeBox} from './time-box';

export class Unavailability {
  id: number|string;
  person: User;
  period: TimeBox;
}
