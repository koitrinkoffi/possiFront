import {User} from './user';

export class Participant {
  student: User;
  followingTeacher: User;
  tutorFullName: string;
  company: string;
  id: number;


  constructor(student: User, followingTeacher: User, tutorFullName: string, company: string, id?: number) {
    this.student = student;
    this.followingTeacher = followingTeacher;
    this.tutorFullName = tutorFullName;
    this.company = company;
    this.id = id;
  }

}
