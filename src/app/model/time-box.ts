import * as moment from 'moment';

export class TimeBox {
  from: string;
  to: string;

  constructor(from?: string, to?: string) {
    if (from !== undefined) {
      this.from = from;
    }
    if (to !== undefined) {
      this.to = to;
    }
  }

  equals(timeBox: TimeBox): boolean {
    return timeBox.from === this.from && timeBox.to === this.to;
  }
}
