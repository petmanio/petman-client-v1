import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import { mapStyles } from '../../../util';

export interface IShopsComponent {}

@Component({
  selector: 'app-shops',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-tab-group>
      <md-tab label="Map view">
        <md-card>
          <md-card-content>
            <sebm-google-map [latitude]="51" [longitude]="7" [styles]="mapStyles"></sebm-google-map>
          </md-card-content>
        </md-card>
      </md-tab>
      <md-tab label="List view">
        <md-card>
          <md-card-content>
            <div class="columns">
              <div class="column">
                <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Shiba Inu</md-card-title>
                    <md-card-subtitle>Dog Breed</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="http://www.haf-haf.am/am/images/logo.png">
                  <md-card-content>
                    <p>
                      Blah blah blah
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
              </div>
              <div class="column">
                <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Shiba Inu</md-card-title>
                    <md-card-subtitle>Dog Breed</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="http://www.yell.am/images/brands/main/7408_5785f180dae73_antarayin_dzaynerweb.jpg">
                  <md-card-content>
                    <p>
                      of of of blah blah of
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
              </div>
              <div class="column">
                <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Shiba Inu</md-card-title>
                    <md-card-subtitle>Dog Breed</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="https://tokyowriter.files.wordpress.com/2010/12/mangapetstore-025.jpg">
                  <md-card-content>
                    <p>
                      The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                      bred for hunting.
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
              </div>
              <div class="column">
              <md-card class="example-card">
                <md-card-header>
                  <div md-card-avatar class="example-header-image"></div>
                  <md-card-title>Shiba Inu</md-card-title>
                  <md-card-subtitle>Dog Breed</md-card-subtitle>
                </md-card-header>
                <img md-card-image src="http://im.hunt.in/cg/coimbatore/City-Guide/pet-stores-in-coimbatore.jpg">
                <md-card-content>
                  <p>
                    The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                    bred for hunting.
                  </p>
                </md-card-content>
                <md-card-actions>
                  <button md-button>LIKE</button>
                  <button md-button>SHARE</button>
                </md-card-actions>
              </md-card>
            </div>
            </div>
            <div class="columns">
              <div class="column">
                <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Shiba Inu</md-card-title>
                    <md-card-subtitle>Dog Breed</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="http://www.haf-haf.am/am/images/logo.png">
                  <md-card-content>
                    <p>
                      Blah blah blah
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
              </div>
              <div class="column">
                <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Shiba Inu</md-card-title>
                    <md-card-subtitle>Dog Breed</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="http://www.yell.am/images/brands/main/7408_5785f180dae73_antarayin_dzaynerweb.jpg">
                  <md-card-content>
                    <p>
                      of of of blah blah of
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
              </div>
              <div class="column">
                <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Shiba Inu</md-card-title>
                    <md-card-subtitle>Dog Breed</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="https://tokyowriter.files.wordpress.com/2010/12/mangapetstore-025.jpg">
                  <md-card-content>
                    <p>
                      The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                      bred for hunting.
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
              </div>
              <div class="column">
                <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Shiba Inu</md-card-title>
                    <md-card-subtitle>Dog Breed</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="http://im.hunt.in/cg/coimbatore/City-Guide/pet-stores-in-coimbatore.jpg">
                  <md-card-content>
                    <p>
                      The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                      bred for hunting.
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
              </div>
            </div>
          </md-card-content>
        </md-card>        
      </md-tab>
    </md-tab-group>
  `,
  styles: [`
    md-card {
      /*min-height: 700px;*/
    }
    :host /deep/ .mat-tab-labels {
      /*justify-content: center;*/
    }
    .sebm-google-map-container {
      height: 600px;
    }

    @media (max-width: 600px) and (orientation: portrait) {
      .sebm-google-map-container {
        height: 300px;
      }
    }
  `]
})
export class ShopsComponent implements OnInit, IShopsComponent {
  public mapStyles = mapStyles;
  constructor(private store: Store<fromRoot.State>, private router: Router) {
  }

  public ngOnInit(): void {

  }
}
