import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isBeforeLunchBreak'
})
export class IsBeforeLunchBreakPipe implements PipeTransform {

  transform(value: any[], property?: string): any {
    if (typeof value !== 'undefined') {
      console.log(value);
    } else {
      return[];
    }
  }

}
