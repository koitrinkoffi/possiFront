import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  private title: string;

  @Input()
  private subtitle: string;

  @Input()
  private icon: string;

  @Input()
  private color: string;

  constructor() {}

  ngOnInit() {
  }

}
