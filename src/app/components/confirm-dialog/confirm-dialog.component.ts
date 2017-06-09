import { Component, ElementRef, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export interface IConfirmDialogComponent {
  close(): void
  ok($event): void
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="confirm-dialog">
      <div class="columns">
        <div class="column">
          <button (click)="close()" md-button>{{'cancel' | translate}}</button>
          <button md-button (click)="ok()">{{'confirm' | translate}}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      overflow: hidden;
    }
  `]
})
export class ConfirmDialogComponent implements OnInit, IConfirmDialogComponent {
  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>, private ref: ElementRef) {

  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(false);
  }

  ok(): void {
    this.dialogRef.close(true)
  }
}
