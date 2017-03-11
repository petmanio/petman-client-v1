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
          <app-nav-item (activate)="onItemActivate.emit()" icon="home">Home</app-nav-item>    
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="place">Pets friendly cafes</app-nav-item>
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="shopping_basket">Pets shops</app-nav-item>
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="pets">Pets beauty salon</app-nav-item>
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="pets">Walks</app-nav-item>          
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="public">Pets blog</app-nav-item>
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="account_circle">Profile</app-nav-item>
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="settings">Settings</app-nav-item>                  
          <app-nav-item (activate)="onItemActivate.emit()" icon="help">Help</app-nav-item>
          <app-nav-item (activate)="onItemActivate.emit()" icon="info">About Us</app-nav-item>
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
      min-height: calc(100% - 56px);
    }
  `]
})
export class SidenavComponent implements ISidenavComponent {
  @Input() open = false;
  @Input() mode: string;
  @Input() currentUser;
  @Output() onItemActivate = new EventEmitter();

  onClick($event: Event): void {
    $event.stopPropagation();
  }
}
