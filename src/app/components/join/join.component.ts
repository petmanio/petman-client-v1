import { Component, ChangeDetectionStrategy } from '@angular/core';

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
                <button md-raised-button color="primary">Login In</button><button md-raised-button color="primary">Login with facebook</button>
              </md-card-actions> 
            </form>
          </md-card-content>
        </md-card>        
      </md-tab>
      <md-tab label="Register">
        <md-card>
          <md-card-title>
            Register
          </md-card-title>
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
  `]
})
export class JoinComponent {
  constructor() {

  }
}
