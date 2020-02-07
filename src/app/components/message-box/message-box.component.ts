import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input()
  private title: string;
  @Input()
  private  subtitle: string;
  @Input()
  private content: string;
  @Input()
  private type = 'info';
  private isVisible = true;
  constructor() { }

  ngOnInit() {
  }
  onClose() {
   this.isVisible = false;
  }

}
