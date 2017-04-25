import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as applicationAction from '../../store/application/application.actions';
import { UtilService } from '../../services/util/util.service';

export interface IApplicationsComponent {
}

@Component({
  selector: 'app-applications',
  template: `
    <div class="columns">
     
    </div>
    <div class="columns">
      
    </div>
  `,
  styles: [`
    
  `]
})
export class ApplicationsComponent implements OnInit, IApplicationsComponent {
  applicationList$: Observable<any>;
  isMobile = UtilService.getCurrentDevice() === 'MOBILE';
  private _skip = 0;
  private _limit = 9;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.applicationList$ = _store.select(fromRoot.getApplicationList);
  }

  ngOnInit(): void {
    this._store.dispatch(new applicationAction.ListClearAction({}));
    this._store.dispatch(new applicationAction.ListAction({ limit: this._limit, skip: this._skip }));
  }
}
