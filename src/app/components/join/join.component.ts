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
              <button md-raised-button color="primary">Login In</button>     
            </form>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-content>
            <button md-raised-button color="primary">Login with facebook</button>
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
    md-card-title {
      display: flex;
      justify-content: center;
    }
    md-card-content {
      display: flex;
      justify-content: center;
    }
  `]
})
export class JoinComponent {
  constructor() {

  }
}
