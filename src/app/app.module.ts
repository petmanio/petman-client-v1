import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
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
  AppComponent,
  LayoutComponent,
  HomeComponent,
  BlogComponent,
  JoinComponent,
  LocationsComponent,
  MessagesComponent,
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

import {
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  BlogItemComponent,
  LocationItemComponent,
  ReviewListComponent,
  ReviewDialogComponent,
  RoomComponent,
  RoomReviewsListDialogComponent,
  RoomApplicationsListComponent,
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
  LostFoundCardComponent,
  LostFoundCommentsComponent,
  LostFoundCommentComponent,
  NotificationsComponent,
  ShareDialogComponent,
  MapComponent,
  ConfirmDialogComponent
} from './components';
import { FitContentsDirective } from './directives';

import { EllipsisPipe, KeysPipe, KeysOrderPipe, ChunkPipe, FormatDatePipe } from './pipes';
import {
  AuthService,
  BlogService,
  UtilService,
  LocationService,
  RoomService,
  WalkerService,
  AdoptService,
  LostFoundService,
  QuestionService,
  NotificationService,
  MessageService
} from './services';
import {
  AuthEffects,
  BlogEffects,
  LocationEffects,
  RoomEffects,
  WalkerEffects,
  AdoptEffects,
  QuestionEffects,
  NotificationEffects,
  LostFoundEffects,
  MessageEffects
} from './store';
import { AuthGuard, RoomExistsGuard, MessagesExistsGuard } from './guards';

import { reducer } from './store';
import { appRoutes } from './app.routes';
import { CustomRequestOptions } from './helpers/CustomRequestOptions';

// import { schema } from './db';

@NgModule({
  declarations: [
    /**
     * Containers
     */
    AppComponent,
    LayoutComponent,
    HomeComponent,
    BlogComponent,
    JoinComponent,
    LocationsComponent,
    MessagesComponent,
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
    // QuestionsComponent,

    /**
     * Components
     */
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    BlogItemComponent,
    LocationItemComponent,
    ReviewListComponent,
    ReviewDialogComponent,
    RoomComponent,
    RoomReviewsListDialogComponent,
    RoomApplicationsListComponent,
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
    LostFoundCardComponent,
    LostFoundCommentsComponent,
    LostFoundCommentComponent,
    NotificationsComponent,
    ShareDialogComponent,
    MapComponent,
    ConfirmDialogComponent,
    FitContentsDirective,
    EllipsisPipe,
    KeysPipe,
    KeysOrderPipe,
    ChunkPipe,
    FormatDatePipe
  ],
  entryComponents: [
    WalkerApplyDialogComponent,
    WalkerReviewDialogComponent,
    ShareDialogComponent,
    ConfirmDialogComponent,
    RoomReviewsListDialogComponent,
    ReviewDialogComponent
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
    MdSelectModule, MdPaginatorModule,
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
    EffectsModule.run(LostFoundEffects),
    // EffectsModule.run(QuestionEffects),
    EffectsModule.run(NotificationEffects),
    EffectsModule.run(MessageEffects),
    // DBModule.provideDB(schema),
  ],
  providers: [
    // { provide: RequestOptions, useClass: CustomRequestOptions },
    AuthGuard,
    RoomExistsGuard,
    MessagesExistsGuard,
    AuthService,
    BlogService,
    LocationService,
    RoomService,
    WalkerService,
    AdoptService,
    LostFoundService,
    QuestionService,
    NotificationService,
    MessageService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
