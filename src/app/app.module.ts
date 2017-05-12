import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdSidenavModule, MdInputModule, MdChipsModule, MdSlideToggleModule,
  MdToolbarModule, MdIconModule, MdListModule, MdProgressBarModule, MdTabsModule, MdSnackBarModule, MdDialogModule
} from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RatingModule } from 'ngx-rating';
import { ImageUploadModule } from 'angular2-image-upload';
import { SailsModule } from 'angular2-sails';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MasonryModule } from 'angular2-masonry';
import { environment } from '../environments/environment';

// import { DBModule } from '@ngrx/db';
// import { ImageCropperModule } from 'ng2-img-cropper';
// import { ImageUploadModule } from 'ng2-imageupload';
// TODO: create fake module and export all modules from material
// TODO: https://github.com/benjaminbrandmeier/angular2-image-gallery use this library for gallery

import {
  AppComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  WelcomeComponent,
  DashboardComponent,
  BlogComponent,
  BlogItemComponent,
  JoinComponent,
  LocationComponent,
  LocationItemComponent,
  RoomsComponent,
  RoomComponent,
  RoomAddComponent,
  RoomDetailsComponent,
  RoomRatingRowComponent,
  RoomApplyDialogComponent,
  RoomApplicationActionsComponent,
  RoomApplicationMessagesComponent,
  RoomApplicationMessageComponent,
  RoomApplicationsListComponent,
  RoomReviewsListComponent,
  RoomReviewDialogComponent,
  RoomStatisticsComponent,
  WalkersComponent,
  WalkerComponent,
  WalkerAddComponent,
  WalkerDetailsComponent,
  WalkerApplyDialogComponent,
  WalkerApplicationActionsComponent,
  WalkerApplicationMessagesComponent,
  WalkerApplicationMessageComponent,
  WalkerApplicationsListComponent,
  WalkerReviewsListComponent,
  WalkerReviewDialogComponent,
  AdoptListComponent,
  AdoptCardComponent,
  AdoptAddComponent,
  AdoptDetailsComponent,
  NotificationsComponent,
  ShareDialogComponent,
  MapComponent
} from './components';
import { FitContentsDirective } from './directives';
import { EllipsisPipe, KeysPipe, KeysOrderPipe, ChunkPipe } from './pipes';
import {
  AuthService,
  BlogService,
  UtilService,
  LocationService,
  RoomService,
  WalkerService,
  AdoptService,
  NotificationService
} from './services';
import { AuthEffects, BlogEffects, LocationEffects, RoomEffects, WalkerEffects, AdoptEffects, NotificationEffects } from './store';
import { AuthGuard } from './guards';

import { reducer } from './store';
// import { schema } from './db';

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: {
      auth: false,
      toolbarRightButtons: ['JOIN'],
      showSidenav: false
    }
  },
  {
    path: 'join',
    component: JoinComponent,
    canActivate: [AuthGuard],
    data: {
      auth: false,
      showSidenav: false
    }
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'locations',
    component: LocationComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'room',
    component: RoomsComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'room/add',
    component: RoomAddComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'room/:roomId/details',
    component: RoomDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'walker',
    component: WalkersComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'walker/add',
    component: WalkerAddComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'walker/:walkerId/details',
    component: WalkerDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'adopt',
    component: AdoptListComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'adopt/add',
    component: AdoptAddComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: 'adopt/:adoptId/details',
    component: AdoptDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS'],
      showSidenav: true
    }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    WelcomeComponent,
    DashboardComponent,
    BlogComponent,
    BlogItemComponent,
    JoinComponent,
    LocationComponent,
    LocationItemComponent,
    RoomsComponent,
    RoomComponent,
    RoomAddComponent,
    RoomDetailsComponent,
    RoomRatingRowComponent,
    RoomApplyDialogComponent,
    RoomApplicationActionsComponent,
    RoomApplicationMessagesComponent,
    RoomApplicationMessageComponent,
    RoomApplicationsListComponent,
    RoomReviewsListComponent,
    RoomReviewDialogComponent,
    RoomStatisticsComponent,
    WalkersComponent,
    WalkerComponent,
    WalkerAddComponent,
    WalkerDetailsComponent,
    WalkerApplyDialogComponent,
    WalkerApplicationActionsComponent,
    WalkerApplicationMessagesComponent,
    WalkerApplicationMessageComponent,
    WalkerApplicationsListComponent,
    WalkerReviewsListComponent,
    WalkerReviewDialogComponent,
    AdoptListComponent,
    AdoptCardComponent,
    AdoptAddComponent,
    AdoptDetailsComponent,
    NotificationsComponent,
    ShareDialogComponent,
    MapComponent,
    FitContentsDirective,
    EllipsisPipe,
    KeysPipe,
    KeysOrderPipe,
    ChunkPipe
  ],
  entryComponents: [
    // TODO: use only one review dialog for whole application
    RoomApplyDialogComponent,
    RoomReviewDialogComponent,
    WalkerApplyDialogComponent,
    WalkerReviewDialogComponent,
    ShareDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdSidenavModule, MdInputModule, MdChipsModule, MdSlideToggleModule,
    MdToolbarModule, MdIconModule, MdListModule, MdProgressBarModule, MdTabsModule, MdSnackBarModule, MdDialogModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    InfiniteScrollModule,
    RatingModule,
    ImageUploadModule.forRoot(),
    SailsModule.forRoot(),
    SwiperModule.forRoot({}),
    MasonryModule,
    // ImageCropperModule,
    // ImageUploadModule,
    // NgxSiemaModule,
    // SwiperModule,
    EffectsModule.run(AuthEffects),
    EffectsModule.run(BlogEffects),
    EffectsModule.run(LocationEffects),
    EffectsModule.run(RoomEffects),
    EffectsModule.run(WalkerEffects),
    EffectsModule.run(AdoptEffects),
    EffectsModule.run(NotificationEffects),
    // DBModule.provideDB(schema),
  ],
  providers: [
    AuthGuard,
    AuthService,
    BlogService,
    LocationService,
    RoomService,
    WalkerService,
    AdoptService,
    NotificationService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
