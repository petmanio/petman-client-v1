import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';

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
                <input mdInput placeholder="Email">
              </md-input-container>
              <md-input-container>
                <input mdInput placeholder="Password">
              </md-input-container>
              <md-card-actions>
                <button md-raised-button color="primary">Login In</button>
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
export class JoinComponent {
  constructor(private store: Store<fromRoot.State>) {
  }

  fbLogin() {
    this.store.dispatch(new authAction.FbLoginAction());
  }
}
