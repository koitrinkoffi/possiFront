import { Component } from '@angular/core';

export const baseUrl = 'http://possi2019.univ-rennes1.fr:8080/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'possiFront';
}
