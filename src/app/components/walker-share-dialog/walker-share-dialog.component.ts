import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export interface IWalkerShareDialogComponent {
  onShare(network: string): void
}

@Component({
  selector: 'app-walker-share-dialog',
  template: `
    <div class="walker-share-dialog">
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
    .walker-share-dialog {
      overflow: hidden;
      min-width: 200px;
    }
  `]
})
export class WalkerShareDialogComponent implements IWalkerShareDialogComponent {
  constructor(public dialogRef: MdDialogRef<WalkerShareDialogComponent>) {

  }

  onShare(network: string): void {
    setTimeout(() => this.dialogRef.close(network), 300);
  }
}
