import { Component, Input } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';

export interface IRoomApplicationChatComponent {

}

@Component({
  selector: 'app-room-application-chat',
  template: `
    <div class="pm-background-lightest-gray">
      <ul class="pm-chat-list">
        <li *ngFor="let i of [1,2]">
          <div class="columns is-mobile pm-chat-row">
            <div class="column is-11-desktop is-10-mobile">
              <div class="pm-chat-text pm-background-light-pink">
                          <span class="pm-font-12 pm-color-white">
                            Lorem Ipsum is simply dummy text of the printing and typesetting </span>
              </div>

            </div>
            <div class="column is-1-desktop is-2-mobile">
              <span class="pm-font-10 pm-color-gray">10:24</span>
            </div>
          </div>
        </li>
        <li *ngFor="let i of [1,2,3,4,6]">
          <div class="columns is-mobile pm-chat-row">
            <div class="column is-1-desktop is-2-mobile">
              <div md-card-avatar class="pm-cart-avatar"
                   [ngStyle]="{'background-image': 'url(' + 'https://fb-s-a-a.akamaihd.net/h-ak-xfl1/v/t1.0-1/' +
                              'c0.0.480.480/p480x480' +
                          '/17990916_1671967849497512_7190601138827019061_n.jpg?oh=80c9d09ca63c770b8f8d21fa21b609b5&oe=59988214&__gda__=' +
                           '1503211597_553a09894fc90fcb6b2ffe02b5168d4f' + ')'}"></div>&nbsp;
            </div>
            <div class="column is-10-desktop is-8-mobile">
              <div class="pm-chat-text pm-background-light-gray">
                          <span class="pm-font-12 pm-color-gray">
                            Lorem Ipsum is simply dummy text of the printing and typesetting  Lorem Ipsum is simply dummy text of 
                            the printing and typesetting  Lorem Ipsum is simply dummy text of the printing and typesetting </span>
              </div>

            </div>
            <div class="column is-1">
              <span class="pm-font-10 pm-color-gray">10:24</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="columns is-mobile pm-chart-actions">
        <div class="column is-10">
          <md-input-container>
            <input mdInput placeholder="Type a message" name="message"/>
          </md-input-container>
        </div>
        <div class="column is-2"><button md-button>Send</button></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .pm-chat-row {
      width: 100%;
    }

    .pm-chat-list {
      height: auto;
      list-style: none;
      padding-left: 5px;
    }

    .pm-chat-text {
      padding: 10px;
    }

    md-input-container {
      width: 100%;
    }

    .pm-chart-actions input {
      padding: 5px;
    }

  `]
})
export class RoomApplicationChatComponent {
  @Input() room: IRoom;
  @Input() application: IRoomApplication;
  constructor() {

  }
}
