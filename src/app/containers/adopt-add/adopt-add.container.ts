import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileHolder, ImageUploadComponent } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import { clone, remove } from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import * as fromRoot from '../../store';
import * as adoptAction from '../../store/adopt/adopt.actions';
import { Subject } from 'rxjs/Subject';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

// TODO: add loader after before preview
// TODO: add image resize functionality
export interface IAdoptAddContainer {
  onImageUploaded($event: FileHolder): void,
  onImageRemove($event: FileHolder): void,
  onSaveAdopt(): void
}

@Component({
  selector: 'app-adopt-add',
  template: `
    <div class="columns">
      <div class="column pm-adopt-add-container is-6 is-offset-3">
        <form #adoptForm="ngForm">
          <div class="columns">
            <md-input-container>
              <textarea mdInput [placeholder]="'description' | translate"
                        name="description" required [(ngModel)]="adopt.description"></textarea>
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
            </div>
            <div class="column">
              <button type="submit" class="btn btn-success pm-fr"
                      [color]="(adoptForm.form.valid && adopt.images.length) ? 'primary' : 'warn'"
                      md-button (click)="(adoptForm.form.valid && adopt.images.length) && onSaveAdopt()">{{'add' | translate}}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  `,
  styles: [`
    .pm-adopt-add-container {
      margin-top: 15px;
    }

    md-input-container {
      width: 100%;
    }

    @media (max-width: 600px) and (orientation: portrait) {
      .pm-adopt-add-container {
        padding-top: 0;
      }

      /deep/ .drag-box-message {
         display: none !important;
      }
    }
  `]
})
export class AdoptAddContainer implements OnInit, OnDestroy, IAdoptAddContainer {
  @ViewChild(ImageUploadComponent) private _imageUploadComponent;
  // TODO: Add model
  adopt: any = {
    images: []
  };
  private _destroyed$ = new Subject<boolean>();

  constructor(private _ref: ChangeDetectorRef, private _store: Store<fromRoot.State>, private _actions$: Actions,
              private _snackBar: MdSnackBar, private _router: Router) {
  }

  ngOnInit(): void {
    this._actions$
      .ofType(adoptAction.ActionTypes.CREATE_COMPLETE)
      .takeUntil(this._destroyed$)
      .do((action) => {
        this._router.navigate(['adopt', action.payload.id, 'details']);
      })
      .subscribe();

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  onImageUploaded($event: FileHolder): void {
    this.adopt = Object.assign(this.adopt, {images: this.adopt.images.concat($event)});
    this._ref.detectChanges();
  }

  onImageRemove($event: FileHolder): void {
    remove(this.adopt.images, (image: any) => image.src === $event.src);
  }

  onSaveAdopt(): void {
    const formData = clone(this.adopt);
    formData.images = formData.images.map(image => image.file);
    this._store.dispatch(new adoptAction.CreateAction(formData));
  }

}
