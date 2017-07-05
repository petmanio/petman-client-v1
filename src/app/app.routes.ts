import { Routes } from '@angular/router';
import {
  HomeComponent,
  BlogComponent,
  JoinComponent,
  LocationsComponent,
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
  QuestionsComponent
} from './containers';

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
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'rooms/add',
    component: RoomAddComponent,
  },
  {
    path: 'rooms/:roomId/details',
    component: RoomDetailsComponent,
  },
  {
    path: 'walkers',
    component: WalkersComponent,
  },
  {
    path: 'walkers/add',
    component: WalkerAddComponent,
  },
  {
    path: 'walkers/:walkerId/details',
    component: WalkerDetailsComponent,
  },
  {
    path: 'adopt',
    component: AdoptListComponent,
  },
  {
    path: 'adopt/add',
    component: AdoptAddComponent,
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
  },
  {
    path: 'lost-found/:lostFoundId/details',
    component: LostFoundDetailsComponent,
  },
  {
    path: 'questions',
    component: QuestionsComponent,
  },
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
