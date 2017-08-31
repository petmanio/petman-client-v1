import { Component, Input } from '@angular/core';
import { IBlog } from '../../models/api';
import { UtilService } from '../../services/util/util.service';

export interface IBlogItemComponent {
}

@Component({
  selector: 'app-blog-item',
  template: `
    <md-card>
      <md-card-header>
        <div md-card-avatar *ngIf="blog.icon" class="pm-cart-avatar"  [ngStyle]="{'background-image': 'url(' + blog.icon + ')'}"></div>
        <md-card-title>{{blog.source}}</md-card-title>
        <md-card-subtitle>
          <span class="pm-font-12 pm-color-gray">
            {{(blog.sourceCreatedAt || blog.createdAt) | appFormatDate}}
          </span>
        </md-card-subtitle>
        <a md-icon-button class="pm-blog-action-open" target="_blank" [href]="blog.link">
          <md-icon class="pm-font-16 pm-color-gray">open_in_new</md-icon>
        </a>
      </md-card-header>
      <md-divider></md-divider><br/>
      <a target="_blank" [href]="blog.link">
        <md-card-content class="pm-cursor-pointer">
          <img md-card-image [src]="blog.thumbnail">
          <div class="pm-blog-description pm-font-16 pm-color-gray">{{blog.description}}</div>
        </md-card-content>  
      </a>
    </md-card>
  `,
  styles: [`
    md-card-title {
      margin-top: 10px;
    }

    .pm-blog-description {
      margin-bottom: 25px;
    }

    .pm-blog-action-open {
      margin-left: auto;
    }
    
    a {
      text-decoration: none;
    }
  `]
})
export class BlogItemComponent implements IBlogItemComponent {
  @Input() blog: IBlog;
  constructor() {}
}
