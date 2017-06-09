import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileHolder, ImageUploadComponent } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import { clone, remove } from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import * as fromRoot from '../../store';
import * as lostFoundAction from '../../store/lostFound/lostFound.actions';
import { Subject } from 'rxjs/Subject';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

// TODO: add loader after before preview
// TODO: add image resize functionality
export interface ILostFoundAddContainer {
  onImageUploaded($event: FileHolder): void,
  onImageRemove($event: FileHolder): void,
  onSaveLostFound(): void
}

@Component({
  selector: 'app-lost-found-add',
  template: `
    <div class="columns">
      <div class="column pm-lost-found-add-container is-6 is-offset-3">
        <form #lostFoundForm="ngForm">
          <div class="columns">
            <md-input-container>
              <textarea mdInput [placeholder]="'description' | translate"
                        name="description" required [(ngModel)]="lostFound.description"></textarea>
            </md-input-container>
          </div>
          <div class="columns">
            <div class="column">
              <image-upload
                [preview]="true"
                [max]="4"
                [maxFileSize]="1048576"
                (onFileUploadFinish)="onImageUploaded($event)"
                [buttonCaption]="'select_images' | translate"
                [dropBoxMessage]="''"
                (onRemove)="onImageRemove($event)"></image-upload>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-4">
              <md-radio-group class="example-radio-group" required  name="type" [(ngModel)]="lostFound.type">
                <md-radio-button value="LOST">{{'lost' | translate}}</md-radio-button>
                <md-radio-button value="FOUND">{{'found' | translate}}</md-radio-button>
              </md-radio-group>
            </div>
            <div class="column">
              <button type="submit" class="btn btn-success pm-fr"
                      [color]="(lostFoundForm.form.valid && lostFound.images.length) ? 'primary' : 'warn'"
                      md-button (click)="(lostFoundForm.form.valid && lostFound.images.length) && onSaveLostFound()">{{'add' | translate}}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  `,
  styles: [`
    .pm-lost-found-add-container {
      margin-top: 15px;
    }

    md-input-container {
      width: 100%;
    }

    @media (max-width: 600px) and (orientation: portrait) {
      .pm-lost-found-add-container {
        padding-top: 0;
      }

      /deep/ .drag-box-message {
         display: none !important;
      }
    }
  `]
})
export class LostFoundAddContainer implements OnInit, OnDestroy, ILostFoundAddContainer {
  @ViewChild(ImageUploadComponent) private _imageUploadComponent;
  // TODO: Add model
  lostFound: any = {
    images: []
  };
  private _destroyed$ = new Subject<boolean>();

  constructor(private _ref: ChangeDetectorRef, private _store: Store<fromRoot.State>, private _actions$: Actions,
              private _snackBar: MdSnackBar, private _router: Router) {
  }

  ngOnInit(): void {
    this._actions$
      .ofType(lostFoundAction.ActionTypes.CREATE_COMPLETE)
      .takeUntil(this._destroyed$)
      .do((action) => {
        this._router.navigate(['lost-found', action.payload.id, 'details']);
      })
      .subscribe();

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  onImageUploaded($event: FileHolder): void {
    this.lostFound = Object.assign(this.lostFound, {images: this.lostFound.images.concat($event)});
    this._ref.detectChanges();
  }

  onImageRemove($event: FileHolder): void {
    remove(this.lostFound.images, (image: any) => image.src === $event.src);
  }

  onSaveLostFound(): void {
    const formData = clone(this.lostFound);
    formData.images = formData.images.map(image => image.file);
    this._store.dispatch(new lostFoundAction.CreateAction(formData));
  }

}
