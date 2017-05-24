import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IAdopt, IAdoptComment, IAdoptCommentListResponse, IUser } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as adoptAction from '../../store/adopt/adopt.actions';

export interface IAdoptCommentsComponent {
  onSendComment(): void
}

@Component({
  selector: 'app-adopt-comments',
  template: `
    <div class="pm-background-lightest-gray">
      <div class="pm-font-14 pm-color-gray pm-load-more pm-cursor-pointer"
           (click)="loadMore.emit()">Load more <i class="mdi mdi-dots-horizontal"></i></div>
      <ul class="pm-message-list">
        <li *ngFor="let comment of comments">
          <app-adopt-comment
            [comment]="comment"></app-adopt-comment>    
        </li>
      </ul>
      <div class="columns is-mobile pm-chart-actions">
        <div class="column is-10 is-offset-1">
          <span class="pm-color-gray pm-font-10" *ngIf="!(currentUser$ | async)">
            Please login for leave a comment
          </span>
          <md-input-container>
            <input mdInput 
                   placeholder="Type a message" 
                   name="message" 
                   type="text"
                   autocomplete="off"
                   [disabled]="!(currentUser$ | async)"
                   [(ngModel)]="comment"
                   (keyup.enter)="onSendComment()"/>
          </md-input-container>
        </div>
      </div>
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

    .pm-chart-actions input {
      padding: 5px;
    }
    
    .pm-load-more {
      text-align: center;
      padding-top: 10px;
    }

  `]
})
export class AdoptCommentsComponent implements OnInit, OnChanges, IAdoptCommentsComponent {
  @Input() adopt: IAdopt;
  @Input() comments: IAdoptComment[];
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
      this._store.dispatch(new adoptAction.CommentCreateAction({ adoptId: this.adopt.id, comment: this.comment }));
      this.comment = '';
    }
  }
}
