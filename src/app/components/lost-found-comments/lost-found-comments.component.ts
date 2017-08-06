import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ILostFound, ILostFoundCommentListResponse } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as lostFoundAction from '../../store/lostFound/lostFound.actions';

export interface ILostFoundCommentsComponent {
  onSendComment(): void
}

@Component({
  selector: 'app-lost-found-comments',
  template: `
    <div class="columns is-mobile pm-chat-actions">
      <div class="column is-10 is-offset-1">
          <span class="pm-color-gray pm-font-10" *ngIf="!(currentUser$ | async)">
            {{'please_login' | translate}}
          </span>
        <md-input-container>
          <input mdInput
                 [placeholder]="'type_a_message' | translate"
                 name="message"
                 type="text"
                 autocomplete="off"
                 [disabled]="!(currentUser$ | async)"
                 [(ngModel)]="comment"
                 (keyup.enter)="onSendComment()"/>
        </md-input-container>
      </div>
    </div>
    <div class="pm-background-lightest-gray">
      <ul class="pm-message-list">
        <li *ngFor="let comment of comments.list">
          <app-lost-found-comment
            [comment]="comment"></app-lost-found-comment>    
        </li>
      </ul>
      <div *ngIf="comments.total > comments.list.length" 
            class="pm-font-14 pm-color-gray pm-load-more pm-cursor-pointer"
           (click)="loadMore.emit()">{{'load_more' | translate}} <i class="mdi mdi-dots-horizontal"></i></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .pm-message-list {
      height: auto;
      list-style: none; 
      padding-left: 5px;
    }

    md-input-container {
      width: 100%;
    }

    .pm-chat-actions input {
      padding: 5px;
    }
    
    .pm-load-more {
      text-align: center;
      padding-bottom: 20px;
    }

  `]
})
export class LostFoundCommentsComponent implements OnInit, OnChanges, ILostFoundCommentsComponent {
  @Input() lostFound: ILostFound;
  @Input() comments: ILostFoundCommentListResponse;
  @Output() loadMore = new EventEmitter();
  currentUser$: Observable<any>;
  comment = '';
  constructor(private _store: Store<fromRoot.State>) {
    this.currentUser$ = _store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onSendComment(): void {
    if (this.comment) {
      this._store.dispatch(new lostFoundAction.CommentCreateAction({ lostFoundId: this.lostFound.id, comment: this.comment }));
      this.comment = '';
    }
  }
}
