import { Component, ChangeDetectionStrategy } from '@angular/core';

export interface IDashboardComponent {

}

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="columns">
      <div class="column" *ngFor="let i of [1,2,3,4]">
        <md-card class="example-card">
          <md-card-header>
            <div md-card-avatar class="example-header-image"></div>
            <md-card-title>Shiba Inu</md-card-title>
            <md-card-subtitle>Dog Breed</md-card-subtitle>
          </md-card-header>
          <img md-card-image src="//lorempixel.com/400/200/">
          <md-card-content>
            <p>
              The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
              A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
              bred for hunting.
            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
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
