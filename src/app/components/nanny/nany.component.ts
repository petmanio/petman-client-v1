import { Component } from '@angular/core';

@Component({
  selector: 'app-nanny',
  template: `
    <md-card>
      <md-card-title>Nanny</md-card-title>
    </md-card>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class NannyComponent {
  constructor() {

  }
}
