import { Component, Input } from '@angular/core';
import { IBlog } from '../../models/api';

export interface IBlogItemComponent {

}

@Component({
  selector: 'app-blog-item',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>{{blog.source}}</md-card-title>
        <md-card-subtitle>{{blog.date | date: 'dd/MM/yyyy'}}</md-card-subtitle>
      </md-card-header>
      <img md-card-image [src]="blog.thumbnail">
      <!--<a [href]="blog.link" target="_blank"><img md-card-image [src]="blog.thumbnail"></a>-->
      <md-card-content>
        <p>{{blog.description}}</p>
      </md-card-content>
      <md-card-actions>
        <!--<button md-button>LIKE</button>-->
        <!--<button md-button>SHARE</button>-->
        <a md-button [href]="blog.link" target="_blank">READ</a>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    md-card-title { text-transform: lowercase; }
    md-card-title:first-letter { text-transform: uppercase; }
  `]
})
export class BlogItemComponent implements IBlogItemComponent {
  @Input() blog: IBlog;
  constructor() {

  }
}
