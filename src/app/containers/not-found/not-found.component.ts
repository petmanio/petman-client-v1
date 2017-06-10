import { Component } from '@angular/core';

export interface INotFoundComponent {
}

@Component({
  selector: 'app-not-found',
  template: `
    <div class="columns">
      <div class="column">
        <div class="pm-color-gray pm-font-20">{{'page_not_found' | translate}}</div><br/>
        <div class="pm-color-gray pm-font-14">{{'page_not_found_content' | translate}}</div>
      </div>
    </div>
  `,
  styles: [`
   
  `]
})
export class NotFoundComponent implements INotFoundComponent {
  constructor() {
  }
}
