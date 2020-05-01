import {User} from './user';
import {Room} from './room';
import {TimeBox} from './time-box';
import {Color} from './color';

export class OralDefense {
  id: number;
  room: Room;
  timeBox: TimeBox;
  secondTeacher: User;
  number: number;
  color: Color;
  student: User;
  followingTeacher: User;
  tutorFullName: string;
  company: string;
  unavailabilities: TimeBox[];
}
