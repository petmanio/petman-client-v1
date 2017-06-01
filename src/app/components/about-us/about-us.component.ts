import { Component } from '@angular/core';

export interface IAboutUpComponent {
}

@Component({
  selector: 'app-about-us',
  template: `
    <div class="columns">
      <div class="column">
        <div class="pm-about-us-content">
          <span class="pm-font-20 pm-color-gray">{{'about_us_content' | translate}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pm-about-us-content {
      margin-top: 20%;
      width: 70%;
      text-align: justify;
      margin-left: auto;
      margin-right: auto;
    }
  `]
})
export class AboutUsComponent implements IAboutUpComponent {
  constructor() {
  }
}
