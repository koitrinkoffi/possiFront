import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classroom',
  pure: false
})
export class ClassroomPipe implements PipeTransform {

  transform(value: any[], property?: string, searchString?: string): any {
    if (typeof value !== 'undefined') {
      return value.filter((e) => {
        return e[property].toLowerCase().startsWith(searchString.toLowerCase());
      });
    } else {
      return [];
    }
  }

}
