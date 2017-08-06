import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileHolder, ImageUploadComponent } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import { clone, remove } from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { IRoomCreateRequest } from '../../models/api';

export interface IRoomAddComponent {
  onImageUploaded($event: FileHolder): void,
  onImageRemove($event: FileHolder): void,
  onSaveRoom(): void
}

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss']
})
export class RoomAddComponent implements OnInit, OnDestroy, IRoomAddComponent {
  @ViewChild(ImageUploadComponent) private _imageUploadComponent;
  room: IRoomCreateRequest = {
    description: '',
    cost: null,
    images: []
  };
  private _destroyed$ = new Subject<boolean>();

  constructor(private _ref: ChangeDetectorRef, private _store: Store<fromRoot.State>, private _actions$: Actions, private _router: Router) {
  }

  ngOnInit(): void {
    this._actions$
      .ofType(roomAction.ActionTypes.CREATE_SUCCESS)
      .takeUntil(this._destroyed$)
      .do(action => this._router.navigate(['rooms', action.payload.id, 'details']))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  onImageUploaded($event: FileHolder): void {
    this.room = Object.assign(this.room, {images: this.room.images.concat($event)});
    this._ref.detectChanges();
  }

  onImageRemove($event: FileHolder): void {
    remove(this.room.images, (image: any) => image.src === $event.src);
  }

  onSaveRoom(): void {
    const formData = clone(this.room);
    formData.images = formData.images.map(image => image.file);
    this._store.dispatch(new roomAction.CreateAction(formData));
  }

}
