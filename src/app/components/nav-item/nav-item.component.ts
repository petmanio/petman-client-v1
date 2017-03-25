import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a md-list-item [routerLink]="routerLink" (click)="activate.emit()" [routerLinkActive]="routerLinkActive" ngClass="{{activeClass}}">
      <md-icon md-list-icon>{{ icon }}</md-icon>
      <span md-line><ng-content></ng-content></span> 
      <span md-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [`
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
    .is-active {
      color: #673ab7;
    }
  `]
})
export class NavItemComponent {
  @Input() icon: string = '';
  @Input() hint: string = '';
  @Input() routerLink: string | any[];
  @Input() routerLinkActive: any | any[] = '';
  @Input() activeClass: any | any[] = '';
  @Output() activate = new EventEmitter();
}
