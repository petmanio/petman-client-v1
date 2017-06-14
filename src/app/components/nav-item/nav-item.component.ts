import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a md-list-item [routerLink]="routerLink" (click)="activate.emit()" [routerLinkActive]="routerLinkActive" ngClass="{{activeClass}}">
      <md-icon *ngIf="icon" md-list-icon>{{ icon }}</md-icon>
      <md-icon *ngIf="svgIcon" [svgIcon]="svgIcon" md-list-icon></md-icon>
      
      <span md-line><ng-content></ng-content><md-chip-list *ngIf="chip"><md-chip>{{chip}}</md-chip></md-chip-list></span> 
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
    md-chip-list {
      display: inline-block;
    }
  `]
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() svgIcon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[];
  @Input() routerLinkActive: any | any[] = '';
  @Input() activeClass: any | any[] = '';
  @Input() chip: number;
  @Output() activate = new EventEmitter();
}
