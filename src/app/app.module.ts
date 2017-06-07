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
  MdToolbarModule, MdIconModule, MdListModule, MdProgressBarModule, MdTabsModule, MdSnackBarModule, MdDialogModule, MdRadioModule,
  MdSelectModule
} from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RatingModule } from 'ngx-rating';
import { ImageUploadModule } from 'angular2-image-upload';
import { SailsModule } from 'angular2-sails';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MasonryModule } from 'angular2-masonry';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}
// import { DBModule } from '@ngrx/db';
// import { ImageCropperModule } from 'ng2-img-cropper';
// import { ImageUploadModule } from 'ng2-imageupload';
// TODO: create fake module and export all modules from material
// TODO: https://github.com/benjaminbrandmeier/angular2-image-gallery use this library for gallery

import {
  AppContainer,
  LayoutContainer,
  WelcomeContainer,
  HomeContainer,
  BlogContainer,
  JoinContainer,
  LocationContainer,
  RoomsContainer,
  RoomContainer,
  RoomAddContainer,
  RoomDetailsContainer,
  WalkersContainer,
  WalkerAddContainer,
  WalkerDetailsContainer,
  AdoptListContainer,
  AdoptAddContainer,
  AdoptDetailsContainer,
  AboutUsContainer,
} from './containers';

import {
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  BlogItemComponent,
  LocationItemComponent,
  RoomRatingRowComponent,
  RoomApplyDialogComponent,
  RoomApplicationActionsComponent,
  RoomApplicationMessagesComponent,
  RoomApplicationMessageComponent,
  RoomApplicationsListComponent,
  RoomReviewsListComponent,
  RoomReviewDialogComponent,
  RoomStatisticsComponent,
  WalkerComponent,
  WalkerApplyDialogComponent,
  WalkerApplicationActionsComponent,
  WalkerApplicationMessagesComponent,
  WalkerApplicationMessageComponent,
  WalkerApplicationsListComponent,
  WalkerReviewsListComponent,
  WalkerReviewDialogComponent,
  AdoptCardComponent,
  AdoptCommentsComponent,
  AdoptCommentComponent,
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
    path: 'join',
    component: JoinContainer,
  },
  {
    path: '',
    component: HomeContainer
  },
  {
    path: 'blog',
    component: BlogContainer,
  },
  {
    path: 'locations',
    component: LocationContainer,
  },
  {
    path: 'rooms',
    component: RoomsContainer,
  },
  {
    path: 'rooms/add',
    component: RoomAddContainer,
  },
  {
    path: 'rooms/:roomId/details',
    component: RoomDetailsContainer,
  },
  {
    path: 'walkers',
    component: WalkersContainer,
  },
  {
    path: 'walkers/add',
    component: WalkerAddContainer,
  },
  {
    path: 'walkers/:walkerId/details',
    component: WalkerDetailsContainer,
  },
  {
    path: 'adopt',
    component: AdoptListContainer,
  },
  {
    path: 'adopt/add',
    component: AdoptAddContainer,
  },
  {
    path: 'adopt/:adoptId/details',
    component: AdoptDetailsContainer,
  },
  {
    path: 'about-us',
    component: AboutUsContainer,
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [
    /**
     * Containers
     */
    AppContainer,
    LayoutContainer,
    WelcomeContainer,
    HomeContainer,
    BlogContainer,
    JoinContainer,
    LocationContainer,
    RoomsContainer,
    RoomContainer,
    RoomAddContainer,
    RoomDetailsContainer,
    WalkersContainer,
    WalkerAddContainer,
    WalkerDetailsContainer,
    AdoptListContainer,
    AdoptAddContainer,
    AdoptDetailsContainer,
    AboutUsContainer,

    /**
     * Components
     */
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    BlogItemComponent,
    LocationItemComponent,
    RoomRatingRowComponent,
    RoomApplyDialogComponent,
    RoomApplicationActionsComponent,
    RoomApplicationMessagesComponent,
    RoomApplicationMessageComponent,
    RoomApplicationsListComponent,
    RoomReviewsListComponent,
    RoomReviewDialogComponent,
    RoomStatisticsComponent,
    WalkerComponent,
    WalkerApplyDialogComponent,
    WalkerApplicationActionsComponent,
    WalkerApplicationMessagesComponent,
    WalkerApplicationMessageComponent,
    WalkerApplicationsListComponent,
    WalkerReviewsListComponent,
    WalkerReviewDialogComponent,
    AdoptCardComponent,
    AdoptCommentsComponent,
    AdoptCommentComponent,
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
    MdToolbarModule, MdIconModule, MdListModule, MdProgressBarModule, MdTabsModule, MdSnackBarModule, MdDialogModule, MdRadioModule,
    MdSelectModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    InfiniteScrollModule,
    RatingModule,
    ImageUploadModule.forRoot(),
    SailsModule.forRoot(),
    SwiperModule.forRoot({}),
    MasonryModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
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
  bootstrap: [AppContainer]
})
export class AppModule { }
