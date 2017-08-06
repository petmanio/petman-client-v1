import { Routes } from '@angular/router';
import {
  HomeComponent,
  BlogComponent,
  JoinComponent,
  LocationsComponent,
  MessagesComponent,
  MessageComponent,
  RoomsComponent,
  RoomAddComponent,
  RoomDetailsComponent,
  WalkersComponent,
  WalkerAddComponent,
  WalkerDetailsComponent,
  AdoptListComponent,
  AdoptAddComponent,
  AdoptDetailsComponent,
  LostFoundListComponent,
  LostFoundAddComponent,
  LostFoundDetailsComponent,
  AboutUsComponent,
  NotFoundComponent,
  // QuestionsComponent
} from './containers';

import { AuthGuard, RoomExistsGuard, WalkerExistsGuard, MessagesExistsGuard, MessagesConversationExistsGuard } from './guards';

export const appRoutes: Routes = [
  {
    path: 'join',
    component: JoinComponent,
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'locations',
    component: LocationsComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [ AuthGuard, MessagesExistsGuard ],
  },
  {
    path: 'messages/:userEntityId',
    component: MessageComponent,
    canActivate: [ AuthGuard, MessagesConversationExistsGuard ],
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'rooms/add',
    component: RoomAddComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'rooms/:roomId/details',
    component: RoomDetailsComponent,
    canActivate: [ RoomExistsGuard ],
  },
  {
    path: 'walkers',
    component: WalkersComponent,
  },
  {
    path: 'walkers/add',
    component: WalkerAddComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'walkers/:walkerId/details',
    component: WalkerDetailsComponent,
    canActivate: [ WalkerExistsGuard ],
  },
  {
    path: 'adopt',
    component: AdoptListComponent,
  },
  {
    path: 'adopt/add',
    component: AdoptAddComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'adopt/:adoptId/details',
    component: AdoptDetailsComponent,
  },
  {
    path: 'lost-found',
    component: LostFoundListComponent,
  },
  {
    path: 'lost-found/add',
    component: LostFoundAddComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'lost-found/:lostFoundId/details',
    component: LostFoundDetailsComponent,
  },
  // {
  //   path: 'questions',
  //   component: QuestionsComponent,
  // },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
