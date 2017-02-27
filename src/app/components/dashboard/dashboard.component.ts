import { Component, ChangeDetectionStrategy } from '@angular/core';

export interface IDashboardComponent {

}

@Component({
  selector: 'app-welcome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Dashboard</md-card-title>
    </md-card>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class DashboardComponent implements IDashboardComponent {
  constructor() {

  }
}
