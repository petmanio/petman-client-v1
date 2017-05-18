import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import { IUser } from '../../models/api';

export interface IShareDialogComponent {
  onShare(network: string): void
}

@Component({
  selector: 'app-room-share-dialog',
  template: `
    <div class="room-share-dialog">
      <span class="pm-color-gray pm-font-10">
        Please login for share
      </span>
      <p class="pm-color-gray pm-font-16">
        Share on
      </p>
      <div (click)="onShare('facebook')" 
           [class]="(currentUser$ | async) ? 'pm-cursor-pointer' : 'disabled'">
        <button md-icon-button>
          <i class="mdi mdi-facebook pm-color-facebook pm-font-20"></i>
        </button>
        <span class="pm-color-gray pm-font-16">Facebook</span>
      </div>
    </div>
  `,
  styles: [`
    .room-share-dialog {
      overflow: hidden;
      min-width: 200px;
    }
    .disabled {
      opacity: 0.5;
    }
  `]
})
export class ShareDialogComponent implements OnInit, IShareDialogComponent {
  currentUser$: Observable<any>;
  currentUser: IUser;
  constructor(public dialogRef: MdDialogRef<ShareDialogComponent>, private _store: Store<fromRoot.State>) {
    this.currentUser$ = _store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    this.currentUser$.subscribe($event => this.currentUser = $event);
  }

  onShare(network: string): void {
    if (this.currentUser) {
      setTimeout(() => this.dialogRef.close(network), 300);
    }
  }
}
