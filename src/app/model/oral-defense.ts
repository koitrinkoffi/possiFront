import {User} from './user';
import {Participant} from './participant';
import {Room} from './room';
import {TimeBox} from './time-box';
import {Color} from './color';

export class OralDefense {
  id: number;
  composition: Participant;
  room: Room;
  timeBox: TimeBox;
  secondTeacher: User;
  number: number;
  color: Color;
  unavailabilities: TimeBox[];
}
