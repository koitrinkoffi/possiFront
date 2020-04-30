import { Pipe, PipeTransform } from '@angular/core';
import {OralDefense} from '../model/oral-defense';

@Pipe({
  name: 'oralDefenseSearch'
})
export class OralDefenseSearchPipe implements PipeTransform {

  transform(value: OralDefense[], searchString: string): any {
    if (value !== undefined) {
      searchString = searchString.toLowerCase();
      return value.filter(o => {
        return o.student.firstName.toLowerCase().startsWith(searchString) ||
          o.student.lastName.toLowerCase().startsWith(searchString) ||
          o.followingTeacher.firstName.toLowerCase().startsWith(searchString) ||
          o.followingTeacher.lastName.toLowerCase().startsWith(searchString) ||
          o.secondTeacher.firstName.toLowerCase().startsWith(searchString) ||
          o.secondTeacher.lastName.toLowerCase().startsWith(searchString) ||
          o.tutorFullName.toLowerCase().startsWith(searchString) ||
          o.company.toLowerCase().startsWith(searchString);
      });
    }
    return [];
  }

}
