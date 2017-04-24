import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as contractAction from '../../store/contract/contract.actions';
import { UtilService } from '../../services/util/util.service';

export interface IContractsComponent {
}

@Component({
  selector: 'app-contracts',
  template: `
    <div class="columns">
     
    </div>
    <div class="columns">
      
    </div>
  `,
  styles: [`
    
  `]
})
export class ContractsComponent implements OnInit, IContractsComponent {
  contractList$: Observable<any>;
  isMobile = UtilService.getCurrentDevice() === 'MOBILE';
  private _skip = 0;
  private _limit = 9;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.contractList$ = _store.select(fromRoot.getContractList);
  }

  ngOnInit(): void {
    this._store.dispatch(new contractAction.ListClearAction({}));
    this._store.dispatch(new contractAction.ListAction({ limit: this._limit, skip: this._skip }));
  }
}
