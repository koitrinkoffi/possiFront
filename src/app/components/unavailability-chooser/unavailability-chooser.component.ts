import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unavailability} from '../../model/unavailability';

@Component({
  selector: 'app-unavailability-chooser',
  templateUrl: './unavailability-chooser.component.html',
  styleUrls: ['./unavailability-chooser.component.scss']
})
export class UnavailabilityChooserComponent implements OnInit {

  @Input()
  private unavailabilities: Unavailability[];
  @Output()
  private choice = new EventEmitter<Unavailability>();

  constructor() { }

  ngOnInit() { }

  private toggleAvailability(unavailability: Unavailability) {
    unavailability.available = !unavailability.available;
    this.choice.emit(unavailability);
  }
}
