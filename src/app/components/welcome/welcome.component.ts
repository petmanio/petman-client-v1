import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-welcome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Welcome</md-card-title>
      <img md-card-image src="../../../assets/welcome_new.jpeg">
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
