import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";

import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';

export interface IJoinComponent {
  fbLogin(): void
}

@Component({
  selector: 'app-welcome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-tab-group>
      <md-tab label="Log in">
        <md-card>
          <md-card-content>
            <form>
              <md-input-container>
                <input mdInput placeholder="Email" disabled>
              </md-input-container>
              <md-input-container>
                <input mdInput placeholder="Password" disabled>
              </md-input-container>
              <md-card-actions>
                <button md-raised-button color="primary" disabled mdTooltip="Currently unavailable">Login In</button>
                <button md-raised-button color="primary" (click)="fbLogin()">Login with Facebook</button>
              </md-card-actions> 
            </form>
          </md-card-content>
        </md-card>        
      </md-tab>
      <md-tab label="Register">
        <md-card>
          <md-card-content>
            <form>
              <div>
                <md-input-container>
                  <input mdInput placeholder="First name">
                </md-input-container>
                 <md-input-container>
                  <input mdInput placeholder="Last name">
                </md-input-container>
              </div>
              <div>
                <md-input-container>
                  <input mdInput placeholder="Email">
                </md-input-container>
                <md-input-container>
                  <input mdInput placeholder="Password">
                </md-input-container>
              </div>
              <md-card-actions>
                <button md-raised-button color="primary">Sign Up</button>
                <button md-raised-button color="primary" (click)="fbLogin()">Sign Up with Facebook</button>
              </md-card-actions> 
            </form>
          </md-card-content>
        </md-card>  
      </md-tab>
    </md-tab-group>
  `,
  styles: [`
    md-card-title, md-card-content, md-card-actions {
      display: flex;
      justify-content: center;
    }
    form {
      text-align: center;
    }
    md-card {
    min-height: 180px;
    }
  `]
})
export class JoinComponent implements OnInit, IJoinComponent {
  public authLoginState$: Observable<any>;
  public errorMessage: string = null;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.authLoginState$ = store.select(fromRoot.getAuthLogin);
  }

  public ngOnInit(): void {
    this.authLoginState$.subscribe((event) => {
      if (event.error) {
        this.errorMessage = event.error;
      } else if (event.data) {
        this.router.navigate(['/'])
      }
    });
  }

  fbLogin(): void {
    this.store.dispatch(new authAction.FbLoginAction());
  }
}
