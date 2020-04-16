import { Pipe, PipeTransform } from '@angular/core';
import {UnavailabilityBox} from '../pages/unavailability/unavailability.component';
import {Planning} from '../model/planning';
import * as moment from 'moment';

@Pipe({
  name: 'lunchBreak',
})
export class LunchBreakPipe implements PipeTransform {

  transform(value: UnavailabilityBox[][], planning: Planning, position: number): any {
    if (value !== undefined) {
      if (position === 0) {
        return value.filter(line => moment(line[0].unavailability.period.from).isBefore(moment(planning.lunchBreak.from)));
      } else if (position === 1) {
        return value.filter(line => moment(line[0].unavailability.period.to).isAfter(moment(planning.lunchBreak.to)));
      } else {
        return value.filter(line => moment(line[0].unavailability.period.from).isSameOrAfter(moment(planning.lunchBreak.from)) &&
          moment(line[0].unavailability.period.to).isSameOrBefore(moment(planning.lunchBreak.to)));
      }
    }
    return [];
  }

}
