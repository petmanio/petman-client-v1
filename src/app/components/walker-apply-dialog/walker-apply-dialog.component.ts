import { Component, ElementRef, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { IWalker, IWalkerApplication } from '../../models/api';
import * as moment from 'moment';
const Pikaday = require('pikaday');

export interface IWalkerApplyDialogComponent {
  close(): void
  onCountChange($event): void
}

@Component({
  selector: 'app-walker-apply-dialog',
  template: `
    <div class="walker-apply-dialog">
      <div class="columns">
        <div class="column">
          <md-input-container>
            <input mdInput type="number" placeholder="Pets count" required [(ngModel)]="applyOptions.count"
                   (ngModelChange)="onCountChange($event)">
          </md-input-container>
        </div>
        <!--TODO: add pet type input-->
      </div>
      <div class="columns">
        <div class="column">
          <md-input-container>
            <input id="date-picker-from" mdInput readonly="true" type="text" placeholder="From" required [(ngModel)]="applyOptions.from">
          </md-input-container>
        </div>
        <div class="column">
          <md-input-container>
            <input id="to-picker-from" mdInput readonly="true" type="text" placeholder="To" required [(ngModel)]="applyOptions.to">
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
    .walker-apply-dialog {
      overflow: hidden;
    }
  `]
})
export class WalkerApplyDialogComponent implements OnInit, IWalkerApplyDialogComponent {
  applyOptions = {
    from: '',
    to: '',
    count: 1,
  };
  walker: IWalker;
  private _inProgressApplications: IWalkerApplication[] = [];
  private fromDatePicker;
  private toDatePicker;
  constructor(public dialogRef: MdDialogRef<WalkerApplyDialogComponent>, private ref: ElementRef) {

  }

  ngOnInit(): void {
    this._inProgressApplications = this.walker.applications.filter(application => !application.endedAt);
    this._buildDatePicker();
  }

  onCountChange($event): void {
    this.applyOptions.to = '';
    this.applyOptions.from = '';
  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this.dialogRef.close(this.applyOptions)
  }

  private _buildDatePicker(): void {
    const self = this;
    this.fromDatePicker = new Pikaday({
      field: this.ref.nativeElement.querySelector('#date-picker-from'),
      onSelect: function() {
        self.applyOptions.from = this.getMoment().format('YYYY-MM-DD');
      },
      disableDayFn: (date) => this._isFromDateNotAvailable(date)
    });
    this.toDatePicker = new Pikaday({
      field: this.ref.nativeElement.querySelector('#to-picker-from'),
      onSelect: function() {
        self.applyOptions.to = this.getMoment().format('YYYY-MM-DD');
      },
      disableDayFn: (date) => this._isToDateNotAvailable(date)
    });
  }

  private _isFromDateNotAvailable(date): boolean {
    date = new Date(date);
    const today = new Date();
    if (date <= today) {
      return true;
    } else {
      return this._inProgressApplications.some(shedule => {
        const isInRange = moment(date).isBetween(moment(new Date(shedule.startedAt)), moment(new Date(shedule.endedAt)));
        if (isInRange) {
          return shedule.count + this.applyOptions.count > this.walker.limit
        }
        return false;
      });
    }
  }

  private _isToDateNotAvailable(date): boolean {
    if (this.applyOptions.from) {
      date = new Date(date);
      const from = new Date(this.applyOptions.from);
      if (date < from) {
        return true;
      } else {
        return this._inProgressApplications.some(shedule => {
          const isInRange = moment(date).isBetween(moment(new Date(shedule.startedAt)), moment(new Date(shedule.endedAt)));
          if (isInRange) {
            return shedule.count + this.applyOptions.count > this.walker.limit
          }
          return false;
        });
      }
    }
    return true;
  }
}