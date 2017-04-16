import { Component, EventEmitter } from '@angular/core';
import { FileHolder } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import * as _ from 'lodash';
import { IRoom } from '../../models/api';

// TODO: add loader after before preview

export interface IRoomAddComponent {
  onImageUploaded($event: FileHolder): void,
  onImageRemove($event: FileHolder): void,
  onSaveRoom(): void
}

@Component({
  selector: 'app-room-add',
  template: `
    <div class="columns">
      <div class="column pm-room-add-container is-6" [hidden]="isMobile && roomPreview">
        <form #roomForm="ngForm">
          <div class="columns">
            <md-input-container>
              <input mdInput placeholder="Name (short description)" name="name" required [(ngModel)]="room.name">
            </md-input-container>  
          </div>
          <div class="columns">
            <md-input-container>
              <textarea mdInput placeholder="Description" name="description" required [(ngModel)]="room.description"></textarea>
            </md-input-container>  
          </div>
          <div class="columns">
            <div class="column">
              <image-upload
                [preview]="true"
                [max]="4"
                [maxFileSize]="1048576"
                (onFileUploadFinish)="onImageUploaded($event)"
                (onRemove)="onImageRemove($event)"></image-upload>
            </div>
          </div>
          <div class="columns">
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
      <div class="column is-6 pm-preview-container" [hidden]="isMobile && !roomPreview">
      </div>
    </div>

  `,
  styles: [`
    md-input-container {
      width: 100%;
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
      .pm-room-add-container, .pm-preview-container {
        padding-top: 0;
      }
    }
  `]
})
export class RoomAddComponent implements IRoomAddComponent {
  public room: IRoom = {
    name: '',
    description: '',
    cost: null,
    images: [],
  };
  constructor() {

  }

  onImageUploaded($event: FileHolder): void {
    this.room.images.push($event);
  }

  onImageRemove($event: FileHolder): void {
    _.remove(this.room.images, image => image.src === $event.src);
  }

  onSaveRoom(): void {
    console.log(this.room);
  }

}
