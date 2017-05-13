import { Component, Input, OnInit } from '@angular/core';
import { IAdoptComment } from '../../models/api';
import * as moment from 'moment';

export interface IAdoptCommentComponent {
  getCommentDateFromNow(date): string
}

@Component({
  selector: 'app-adopt-comment',
  template: `
    <div class="columns is-mobile pm-comment-row">
      <div class="column is-1-desktop is-2-mobile">
        <div md-card-avatar class="pm-cart-avatar"
             [ngStyle]="{'background-image': 'url(' + comment.user.userData.avatar + ')'}"></div>&nbsp;
      </div>
      <div class="column is-11-desktop is-9-mobile">
        <div class="pm-comment-text pm-background-light-gray">
          <span class="pm-font-12 pm-color-gray">{{comment.comment}}</span>
        </div>
        <div class="pm-font-10 pm-color-gray pm-comment-time">{{getCommentDateFromNow(comment.createdAt)}}</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .pm-comment-row {
      width: 100%;
    }

    .pm-comment-text {
      padding: 10px;
    }

    md-input-container {
      width: 100%;
    }

    .pm-chart-actions input {
      padding: 5px;
    }

    .pm-comment-time {
      text-align: right;
    }

  `]
})
export class AdoptCommentComponent implements OnInit, IAdoptCommentComponent{
  @Input() comment: IAdoptComment;

  constructor() {
  }

  ngOnInit(): void {
  }

  getCommentDateFromNow(date): string {
    return moment(date).fromNow();
  }
}
