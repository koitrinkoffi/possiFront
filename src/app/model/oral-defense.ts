import {User} from './user';
import {Participant} from './participant';
import {Classroom} from './classroom';
import {TimeBox} from './time-box';

export class OralDefense {
  id: number;
  composition: Participant;
  room: Classroom;
  timeBox: TimeBox;
  secondTeacher: User;
}
