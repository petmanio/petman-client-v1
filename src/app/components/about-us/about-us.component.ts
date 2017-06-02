import { Component } from '@angular/core';

export interface IAboutUpComponent {
}

@Component({
  selector: 'app-about-us',
  template: `
    <div class="columns">
      <div class="column">
        <div class="pm-about-us-content">
          <span class="pm-color-gray">{{'about_us_content' | translate}}</span>
          <div>
            <div class="fb-like" data-href="https://www.facebook.com/petman.io/"
                 data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pm-about-us-content {
      margin-top: 100px;
      width: 70%;
      text-align: justify;
      margin-left: auto;
      margin-right: auto;
      font-size: 20px;
    }
    @media (max-width: 600px) and (orientation: portrait) {
      .pm-about-us-content span {
        font-size: 18px;
      }
    }
  `]
})
export class AboutUsComponent implements IAboutUpComponent {
  constructor() {
  }
}
