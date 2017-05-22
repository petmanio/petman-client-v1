import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router , NavigationStart, NavigationEnd } from '@angular/router';
import { IUser } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as applicationAction from '../../store/notification/notification.actions';
import * as fromRoot from '../../store';
import { TranslateService } from 'ng2-translate';

interface ISidenavComponent {
  onClick($event: Event): void,
  onLanguageChange($event): void
}

@Component({
  selector: 'app-sidenav',
  template: `
    <md-sidenav-container>
      <md-sidenav [opened]="open" [mode]="mode" color="primary" (close)="onClose.emit()">
        <md-nav-list>
          <app-nav-item (activate)="onItemActivate.emit()" icon="dashboard" routerLink="" [activeClass]="[isHomeActive]">
            {{'home' | translate}}</app-nav-item>
          <app-nav-item (activate)="onItemActivate.emit()" routerLink="/locations" icon="location_searching" 
                        routerLinkActive="is-active">{{'locations' | translate}}</app-nav-item>
          <app-nav-item (activate)="onItemActivate.emit()" icon="favorite" routerLink="/rooms"
                        routerLinkActive="is-active">Sitters</app-nav-item>
          <app-nav-item (activate)="onItemActivate.emit()" icon="child_friendly" routerLink="/walkers"
                        routerLinkActive="is-active">Walkers</app-nav-item>
          <app-nav-item (activate)="onItemActivate.emit()" icon="pets" routerLink="/adopt"
                        routerLinkActive="is-active">Adopt</app-nav-item>
          <app-nav-item (activate)="onItemActivate.emit()" icon="public" routerLink="/blog" 
                        routerLinkActive="is-active">Blog</app-nav-item>
          <app-nav-item (activate)="onItemActivate.emit()" icon="help" 
                        class="disabled" hint="comming soon">Vet consultant</app-nav-item>
          <!--<app-nav-item (activate)="onItemActivate.emit()" icon="account_circle">Profile</app-nav-item>-->
          <!--<app-nav-item (activate)="onItemActivate.emit()" icon="settings">Settings</app-nav-item> -->
          <!--<app-nav-item (activate)="onItemActivate.emit()" icon="contact_mail">Help/Contact us</app-nav-item>-->
          <app-nav-item (activate)="onItemActivate.emit()" icon="info" routerLink="/about-us"
                        routerLinkActive="is-active">About Us</app-nav-item>
        </md-nav-list>
        <div class="pm-language">
          <md-select placeholder="Language" (change)="onLanguageChange($event)" [(ngModel)]="lang">
            <md-option value="en">En</md-option>
            <md-option value="am">Am</md-option>
          </md-select>
        </div>
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
    
    .disabled {
      display: block;
      opacity: 0.5;
    }
    
    .pm-language {
      margin-top: 20px;
      display: flex;
      align-content: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
    
    .pm-language md-select {
      width: 100px;
      margin: 0 auto;
    } 
  `]
})
export class SidenavComponent implements ISidenavComponent, OnInit {
  @Input() open = false;
  @Input() mode: string;
  @Output() onItemActivate = new EventEmitter();
  @Output() onClose = new EventEmitter();
  lang: string;
  isHomeActive;
  // TODO: add observable type for all components
  currentUser$: Observable<any>;
  constructor(private _router: Router, private _store: Store<fromRoot.State>, private _translate: TranslateService) {
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {
        this.isHomeActive = this._router.url === '/' ? 'is-active' : '';
        // TODO: find more better way
      }
    });

    // TODO: move to app.component
    this.lang = localStorage.getItem('lang') || 'en';
    localStorage.setItem('lang', this.lang);
    this._translate.use(this.lang);
  }

  onClick($event: Event): void {
    $event.stopPropagation();
  }

  onLanguageChange($event): void {
    this._translate.use(this.lang);
    localStorage.setItem('lang', this.lang);
  }
}
