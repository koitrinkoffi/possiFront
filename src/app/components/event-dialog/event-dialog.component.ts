import {Component, Inject, OnInit} from '@angular/core';
import {CalendarComponent} from '../calendar/calendar.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment';

export interface EventDialogData {
  // Todo supprimer le mode selection
  isSelection: boolean;
  date: string;
  startHourDay: string;
  endHourDay: string;
  startHourBreak: string;
  endHourBreak: string;
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  private dateFormatted: string;
  constructor(
    public dialogRef: MatDialogRef<CalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventDialogData) {
    this.dateFormatted = moment(data.date).format('dddd Do MMMM YYYY, h:mm:ss');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
