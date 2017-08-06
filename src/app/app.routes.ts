import { Routes } from '@angular/router';
import {
  AboutUsComponent,
  AdoptAddComponent,
  AdoptDetailsComponent,
  AdoptListComponent,
  BlogComponent,
  HomeComponent,
  JoinComponent,
  LocationsComponent,
  LostFoundAddComponent,
  LostFoundDetailsComponent,
  LostFoundListComponent,
  MessageComponent,
  MessagesComponent,
  NotFoundComponent,
  RoomAddComponent,
  RoomDetailsComponent,
  RoomsComponent,
  WalkerAddComponent,
  WalkerDetailsComponent,
  WalkersComponent,
} from './containers';

import {
  AuthGuard,
  MessagesConversationExistsGuard,
  MessagesExistsGuard,
  RoomExistsGuard,
  RoomsExistsGuard,
  WalkerExistsGuard,
  WalkersExistsGuard
} from './guards';

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
    canActivate: [ RoomsExistsGuard ],
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
    canActivate: [ WalkersExistsGuard ]
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
