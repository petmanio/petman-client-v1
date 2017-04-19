import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router , NavigationStart, NavigationEnd } from '@angular/router';

interface ISidenavComponent {
  onClick($event: Event): void
}

@Component({
  selector: 'app-sidenav',
  template: `
    <md-sidenav-container>
      <md-sidenav [opened]="open" [mode]="mode" color="primary" (close)="onClose.emit()">
        <md-nav-list>
          <app-nav-item (activate)="onItemActivate.emit()" icon="dashboard" routerLink="" [activeClass]="[isHomeActive]">Home</app-nav-item>
          <!--<app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="place">Pets friendly cafes</app-nav-item>-->
          <!--<app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="shopping_basket" routerLink="/shops" -->
                        <!--routerLinkActive="is-active">Shops</app-nav-item>-->
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" routerLink="/locations" icon="pets" 
                        routerLinkActive="is-active">Pet care</app-nav-item>
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="favorite" routerLink="/rooms"
                        routerLinkActive="is-active">Sitters</app-nav-item>
          <!--<app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="pets">Walks</app-nav-item> -->
          <app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="public" routerLink="/blog" 
                        routerLinkActive="is-active">Blog</app-nav-item>
          <!--<app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="account_circle">Profile</app-nav-item>-->
          <!--<app-nav-item *ngIf="currentUser" (activate)="onItemActivate.emit()" icon="settings">Settings</app-nav-item> -->
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
      box-shadow: -10px 0 50px #acacac;
    }
    md-sidenav-container {
      height: calc(100% - 64px);
      height: -webkit-calc(100% - 64px);
      height: -moz-calc(100% - 64px);
      overflow: hidden;
    }
    @media (max-width: 600px) and (orientation: portrait) {
      md-sidenav-container {
        height: calc(100% - 56px);
        height: -webkit-calc(100% - 56px);
        height: -moz-calc(100% - 56px);
      }
    }    
  `]
})
export class SidenavComponent implements ISidenavComponent, OnInit {
  @Input() open = false;
  @Input() mode: string;
  @Input() currentUser;
  @Output() onItemActivate = new EventEmitter();
  @Output() onClose = new EventEmitter();

  public isHomeActive;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {
        this.isHomeActive = this.router.url === '/' ? 'is-active' : '';
        // TODO: find more better way
      }
    });
  }

  onClick($event: Event): void {
    $event.stopPropagation();
  }
}
