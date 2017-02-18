import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-welcome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Welcome to the Walkypet</md-card-title>
      <md-card-content>Walkypet is a new platform...</md-card-content>
      <img md-card-image src="../../../assets/welcome.jpg">
    </md-card>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class WelcomeComponent {
  constructor() {

  }
}
