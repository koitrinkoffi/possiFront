import { Pipe, PipeTransform } from '@angular/core';
import {OralDefense} from '../model/oral-defense';

@Pipe({
  name: 'oralDefenseUser'
})
export class OralDefenseUserPipe implements PipeTransform {

  transform(value: OralDefense[], uid: string, own: boolean): OralDefense[] {
    if (value !== undefined) {
      return own ?
        value.filter(o => {
          if (o.secondTeacher) {
            return o.student.uid === uid || o.followingTeacher.uid === uid || o.secondTeacher.uid === uid;
          } else {
            return o.student.uid === uid || o.followingTeacher.uid === uid;
          }
        }) :
        value.filter(o => {
          if (o.secondTeacher) {
            return o.student.uid !== uid && o.followingTeacher.uid !== uid && o.secondTeacher.uid !== uid;
          } else {
            return o.student.uid !== uid && o.followingTeacher.uid !== uid;
          }
        });
    }
    return [];
  }

}
