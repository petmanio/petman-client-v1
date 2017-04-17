import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IRoom } from '../../models/api';

export interface IRoomDetailsComponent {

}

@Component({
  selector: 'app-room-details',
  template: `
    <md-card class="room-card">
      <md-card-content>
        <p class="pm-font-bold" [hidden]="!room.name">
          {{room.name}}
        </p>
        <span class="pm-font-12">{{room.cost}}$/day Room</span>
        <div class="pm-image-container">
          <div class="pm-image-selected" [style.background-image]="'url('+ (selectedImage || '/assets/no-image.jpg') +')'"></div>
          <div class="pm-image-thumbnail-row">
            <div *ngFor="let image of room.images"
                 class="pm-image-thumbnail"
                 [ngClass]="{selected: selectedImage === image.src}"
                 (click)="selectedImage = image.src" [style.background-image]="'url('+ image.src +')'"></div>
          </div>  
        </div>
      </md-card-content>
      <md-card-footer>
        <p>{{room.description}}</p>
      </md-card-footer>
    </md-card>
  `,
  styles: [`
    .pm-image-selected {
      height: 400px;
      width: calc(100% + 48px);
      background-repeat: no-repeat;
      background-size: cover;
      margin-left: -24px;
      margin-right: -24px;
    }
    .pm-image-thumbnail {
      height: 50px;
      width: 70px;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      margin: 5px;
      border-radius: 5px;
    }
    .pm-image-thumbnail.selected {
      border: solid 1px #fff;
    }
    
    .pm-image-container {
      position: relative;
    }
    
    .pm-image-thumbnail-row {
      position: absolute;
      bottom: 0;
      right: -24px;
      opacity: 0.85;
      display: flex;
      justify-content: center;
    }
  `]
})
export class RoomDetailsComponent implements OnInit, OnChanges, IRoomDetailsComponent {
  @Input() room: IRoom;
  selectedImage: string;
  constructor() {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
}
