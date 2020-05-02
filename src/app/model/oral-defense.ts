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

  constructor(oralDefense?: OralDefense) {
    if (oralDefense) {
      this.id = oralDefense.id;
      this.room = oralDefense.room;
      this.timeBox = new TimeBox(oralDefense.timeBox.from, oralDefense.timeBox.to);
      this.secondTeacher = oralDefense.secondTeacher;
      this.number = oralDefense.number;
      this.color = oralDefense.color;
      this.student = oralDefense.student;
      this.followingTeacher = oralDefense.followingTeacher;
      this.tutorFullName = oralDefense.tutorFullName;
      this.company = oralDefense.company;
      this.unavailabilities = oralDefense.unavailabilities;
    }
  }
}
