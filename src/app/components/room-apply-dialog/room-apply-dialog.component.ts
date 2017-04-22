import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export interface IRoomApplyDialogComponent {
  close(): void
}

@Component({
  selector: 'app-room-apply-dialog',
  template: `
    <div class="room-apply-dialog">
      <div class="columns">
        <div class="column">
          <md-input-container>
            <input mdInput type="date" placeholder="From" required [(ngModel)]="applyOptions.from">
          </md-input-container>
        </div>
        <div class="column">
          <md-input-container>
            <input mdInput type="date" placeholder="To"  required [(ngModel)]="applyOptions.to">
          </md-input-container>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <md-input-container>
            <input mdInput type="number" placeholder="Pets count" required [(ngModel)]="applyOptions.count">
          </md-input-container>
        </div>
      </div>
      <div class="column">
        <button (click)="close()" md-button>Close</button>
        <button md-button (click)="apply()">Apply</button>
      </div>
    </div>
  `,
  styles: [`
    .room-apply-dialog {
      overflow: hidden;
    }
  `]
})
export class RoomApplyDialogComponent implements IRoomApplyDialogComponent {
  applyOptions = {
    from: '',
    to: '',
    count: '',
  };
  constructor(public dialogRef: MdDialogRef<RoomApplyDialogComponent>) {

  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this.dialogRef.close(this.applyOptions);
  }
}
