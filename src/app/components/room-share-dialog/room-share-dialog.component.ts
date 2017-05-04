import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export interface IRoomShareDialogComponent {
  onShare(network: string): void
}

@Component({
  selector: 'app-room-share-dialog',
  template: `
    <div class="room-share-dialog">
      <p class="pm-color-gray pm-font-16">
        Share on
      </p>
      <div (click)="onShare('facebook')" class="pm-cursor-pointer">
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
  `]
})
export class RoomShareDialogComponent implements IRoomShareDialogComponent {
  constructor(public dialogRef: MdDialogRef<RoomShareDialogComponent>) {

  }

  onShare(network: string): void {
    setTimeout(() => this.dialogRef.close(network), 300);
  }
}
