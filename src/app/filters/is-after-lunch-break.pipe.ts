import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAfterLunchBreak'
})
export class IsAfterLunchBreakPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
