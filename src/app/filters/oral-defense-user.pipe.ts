import { Pipe, PipeTransform } from '@angular/core';
import {OralDefense} from '../model/oral-defense';

@Pipe({
  name: 'oralDefenseUser'
})
export class OralDefenseUserPipe implements PipeTransform {

  transform(value: OralDefense[], uid: string, own: boolean): any {
    if (value !== undefined) {
      return own ?
        value.filter(o => o.composition.student.uid === uid || o.composition.followingTeacher.uid === uid || o.secondTeacher.uid === uid) :
        value.filter(o => o.composition.student.uid !== uid && o.composition.followingTeacher.uid !== uid && o.secondTeacher.uid !== uid);
    }
    return [];
  }

}
