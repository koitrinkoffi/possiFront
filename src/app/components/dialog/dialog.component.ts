import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  submitClass: string;
  cancelClass: string;
  title: string;
  content: string;
  cancelLabel: string;
  submitLabel: string;
  timer?: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  private interval;
  timeLeft = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    if (this.data.timer && this.data.timer > 0) {
      this.timeLeft = this.data.timer;
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timeLeft);
      }
    }, 1000);
  }

}
