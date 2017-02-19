import { Component, Input } from '@angular/core';

interface ISidenavComponent {
  onClick($event: Event): void
}

@Component({
  selector: 'app-sidenav',
  host: {
    '(click)': 'onClick($event)',
  },
  template: `
    <md-sidenav [opened]="open">
      <md-nav-list>
        <ng-content></ng-content>
      </md-nav-list>
    </md-sidenav>
  `,
  styles: [`
    md-sidenav {
      width: 300px;
    }
  `]
})
export class SidenavComponent {
  @Input() open = false;

  onClick($event: Event): void {
    $event.stopPropagation();
  }
}
