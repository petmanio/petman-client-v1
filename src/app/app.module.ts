import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
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
import { MasonryModule } from 'angular2-masonry';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxGalleryModule } from 'ngx-gallery';
import {
  AboutUsComponent,
  AdoptAddComponent,
  AdoptDetailsComponent,
  AdoptListComponent,
  AppComponent,
  BlogComponent,
  HomeComponent,
  JoinComponent,
  LayoutComponent,
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
  AdoptCardComponent,
  AdoptCommentComponent,
  AdoptCommentsComponent,
  BlogItemComponent,
  ConfirmDialogComponent,
  LocationItemComponent,
  LostFoundCardComponent,
  LostFoundCommentComponent,
  LostFoundCommentsComponent,
  MapComponent,
  NavItemComponent,
  NotificationsComponent,
  ReviewDialogComponent,
  ReviewListComponent,
  RoomApplicationsListComponent,
  RoomComponent,
  RoomReviewsListDialogComponent,
  ShareDialogComponent,
  SidenavComponent,
  ToolbarComponent,
  WalkerApplicationsListComponent,
  WalkerComponent,
  WalkerReviewsListDialogComponent
} from './components';
import { FitContentsDirective } from './directives';

import { ChunkPipe, EllipsisPipe, FormatDatePipe, FromNowPipe, KeysOrderPipe, KeysPipe, GalleryImagesPipe } from './pipes';
import {
  AdoptService,
  AuthService,
  BlogService,
  LocationService,
  LostFoundService,
  MessageService,
  NotificationService,
  QuestionService,
  RoomService,
  UtilService,
  WalkerService
} from './services';
import {
  AdoptEffects,
  AuthEffects,
  BlogEffects,
  LocationEffects,
  LostFoundEffects,
  MessageEffects,
  NotificationEffects,
  reducer,
  RoomEffects,
  WalkerEffects
} from './store';
import {
  AuthGuard,
  MessagesConversationExistsGuard,
  MessagesExistsGuard,
  RoomExistsGuard,
  RoomsExistsGuard,
  WalkerExistsGuard,
  WalkersExistsGuard
} from './guards';
import { appRoutes } from './app.routes';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}
// import { DBModule } from '@ngrx/db';
// import { ImageCropperModule } from 'ng2-img-cropper';
// import { ImageUploadModule } from 'ng2-imageupload';
// TODO: create fake module and export all modules from material
// TODO: https://github.com/benjaminbrandmeier/angular2-image-gallery use this library for gallery

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
    WalkerReviewsListDialogComponent,
    WalkerApplicationsListComponent,
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
    GalleryImagesPipe,
    KeysOrderPipe,
    ChunkPipe,
    FormatDatePipe,
    FromNowPipe
  ],
  entryComponents: [
    ShareDialogComponent,
    ConfirmDialogComponent,
    RoomReviewsListDialogComponent,
    WalkerReviewsListDialogComponent,
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
    MasonryModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    NgxGalleryModule,
    // ImageCropperModule,
    // ImageUploadModule,
    // NgxSiemaModule,
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
    RoomsExistsGuard,
    WalkerExistsGuard,
    WalkersExistsGuard,
    MessagesExistsGuard,
    MessagesConversationExistsGuard,
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
