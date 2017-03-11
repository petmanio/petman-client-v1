import { Component, Input, Output, EventEmitter } from '@angular/core';

interface ISidenavComponent {
  onClick($event: Event): void
}

@Component({
  selector: 'app-sidenav',
  host: {
    '(click)': 'onClick($event)',
  },
  template: `
    <md-sidenav-container>
      <md-sidenav [opened]="open" [mode]="mode" color="primary">
        <md-nav-list>
          <app-nav-item (activate)="onItemActivate.emit()" icon="info_outline">
            About Us
          </app-nav-item>
        </md-nav-list>
      </md-sidenav>
      <ng-content></ng-content>
    </md-sidenav-container>
  `,
  styles: [`
    md-sidenav {
      width: 300px;
      background-color: #f8f8f8 !important;
    }
    md-sidenav-container {
      min-height: 500px;
    }
  `]
})
export class SidenavComponent implements ISidenavComponent {
  @Input() open = false;
  @Input() mode: string;
  @Output() onItemActivate = new EventEmitter();

  onClick($event: Event): void {
    $event.stopPropagation();
  }
}
