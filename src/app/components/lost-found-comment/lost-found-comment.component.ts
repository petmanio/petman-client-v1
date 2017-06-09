import { Component, Input, OnInit } from '@angular/core';
import { ILostFoundComment } from '../../models/api';
import * as moment from 'moment';

export interface ILostFoundCommentComponent {
  getCommentDateFromNow(date): string
}

@Component({
  selector: 'app-lost-found-comment',
  template: `
    <div class="columns is-mobile pm-comment-row">
      <div class="column is-1-desktop is-2-mobile">
        <div md-card-avatar class="pm-cart-avatar"
             [ngStyle]="{'background-image': 'url(' + comment.user.userData.avatar + ')'}"></div>&nbsp;
      </div>
      <div class="column is-11-desktop is-9-mobile">
        <span class="pm-font-14 pm-color-gray">{{comment.user.userData.firstName}} {{comment.user.userData.firstName}}</span>
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
export class LostFoundCommentComponent implements OnInit, ILostFoundCommentComponent{
  @Input() comment: ILostFoundComment;

  constructor() {
  }

  ngOnInit(): void {
  }

  getCommentDateFromNow(date): string {
    return moment(date).fromNow();
  }
}
