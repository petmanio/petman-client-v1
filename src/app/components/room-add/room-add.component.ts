import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
import { FileHolder, ImageUploadComponent } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { IRoom } from '../../models/api';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { Subject } from 'rxjs/Subject';
import { MdSnackBar } from '@angular/material';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
const smartcrop = require('smartcrop');

// TODO: add loader after before preview
// TODO: add image resize functionality
export interface IRoomAddComponent {
  onImageUploaded($event: FileHolder): void,
  onImageRemove($event: FileHolder): void,
  onSaveRoom(): void
}

@Component({
  selector: 'app-room-add',
  template: `
    <div class="columns">
      <div class="column pm-room-add-container is-6 is-offset-3">
        <form #roomForm="ngForm">
          <!--<div class="columns">-->
            <!--<md-input-container>-->
              <!--<input mdInput placeholder="Name (short description)" name="name" required [(ngModel)]="room.name">-->
            <!--</md-input-container>  -->
          <!--</div>-->
          <div class="columns">
            <md-input-container>
              <textarea mdInput placeholder="Description" name="description" required [(ngModel)]="room.description"></textarea>
            </md-input-container>  
          </div>
          <div class="columns">
            <div class="column">
              <!--<img [src]="data.image"/>-->
              <!--<img-cropper #cropper [image]="data" [settings]="cropperSettings"></img-cropper>-->
              <image-upload
                [preview]="true"
                [max]="4"
                [maxFileSize]="1048576"
                (onFileUploadFinish)="onImageUploaded($event)"
                (onRemove)="onImageRemove($event)"></image-upload>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-8">
              <md-input-container>
                <input type="number" mdInput placeholder="Cost per day/$" name="cost" required [(ngModel)]="room.cost" min="0"/>
              </md-input-container>  
            </div>
            <div class="column is-4">
              <button type="submit" class="btn btn-success pm-fr" 
                      [color]="(roomForm.form.valid && room.images.length) ? 'primary' : 'warn'" 
                      md-button (click)="(roomForm.form.valid && room.images.length) && onSaveRoom()">Add</button>
            </div>
          </div>
        </form>
      </div>
      <!--<div class="column is-6 pm-preview-container">-->
        <!--<app-room-details [room]="room"></app-room-details>-->
      <!--</div>-->
    </div>

  `,
  styles: [`
    .pm-room-add-container {
      margin-top: 15px;
    }
    md-input-container {
      width: 100%;
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
      .pm-room-add-container {
        padding-top: 0;
      }

      /deep/ .drag-box-message {
        display: none !important;
      }
    }
  `]
})
export class RoomAddComponent implements IRoomAddComponent {
  @ViewChild(ImageUploadComponent) private _imageUploadComponent;
  // @ViewChild('cropper') private _cropper: ImageCropperComponent;
  // TODO: UPGRADE fix after upgrade
  room: any;
  // room: IRoom = {
  //   id: null,
  //   // name: '',
  //   description: '',
  //   cost: null,
  //   images: [],
  // };
  // data = {};
  cropperSettings: CropperSettings;
  private _destroyed$ = new Subject<boolean>();
  constructor(private _ref: ChangeDetectorRef, private _store: Store<fromRoot.State>, private _actions$: Actions,
              private _snackBar: MdSnackBar) {
    _actions$
      .ofType(roomAction.ActionTypes.CREATE_COMPLETE)
      .takeUntil(this._destroyed$)
      .do(() => {
        this._snackBar.open(`New room successfully created`, null, {
          duration: 3000
        });
        this.room = {
          id: null,
          // name: '',
          description: '',
          cost: null,
          images: [],
        };
        this._imageUploadComponent.files = [];
        this._imageUploadComponent.fileCounter = 0;
        // TODO: navigate to details page
      })
      .subscribe();

    // this.cropperSettings = new CropperSettings();
    // this.cropperSettings.width = 100;
    // this.cropperSettings.height = 100;
    // this.cropperSettings.croppedWidth = 100;
    // this.cropperSettings.croppedHeight = 100;
    // this.cropperSettings.canvasWidth = 400;
    // this.cropperSettings.canvasHeight = 300;
    // this.cropperSettings.noFileInput = true
  }

  onImageUploaded($event: FileHolder): void {
    // TODO: use smartcrop
    this.room = Object.assign(this.room, { images: this.room.images.concat($event) });
    // const image: any = new Image();
    // image.src = $event.src;
    // this._cropper.setImage(image);
    this._ref.detectChanges();
  }

  onImageRemove($event: FileHolder): void {
    _.remove(this.room.images, (image: any) => image.src === $event.src);
  }

  onSaveRoom(): void {
    const formData = _.clone(this.room);
    formData.images = formData.images.map(image => image.file);
    this._store.dispatch(new roomAction.CreateAction(formData));
  }

}
