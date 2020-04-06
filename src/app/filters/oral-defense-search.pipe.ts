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
        return o.composition.student.firstName.toLowerCase().startsWith(searchString) ||
          o.composition.student.lastName.toLowerCase().startsWith(searchString) ||
          o.composition.followingTeacher.firstName.toLowerCase().startsWith(searchString) ||
          o.composition.followingTeacher.lastName.toLowerCase().startsWith(searchString) ||
          o.secondTeacher.firstName.toLowerCase().startsWith(searchString) ||
          o.secondTeacher.lastName.toLowerCase().startsWith(searchString) ||
          o.composition.tutorFullName.toLowerCase().startsWith(searchString) ||
          o.composition.company.toLowerCase().startsWith(searchString);
      });
    }
    return [];
  }

}
