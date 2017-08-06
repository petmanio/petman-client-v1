import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="toggleMenu.emit($event)">
        <md-icon>menu</md-icon>
      </button>
      <ng-content></ng-content>
    </md-toolbar>
  `
})
export class ToolbarComponent {
  @Output() toggleMenu = new EventEmitter();
}
