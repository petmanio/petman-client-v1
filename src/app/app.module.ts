import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// TODO: create fake module and export all modules from materila
import {
  MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdSidenavModule, MdInputModule, MdChipsModule, MdSlideToggleModule,
  MdToolbarModule, MdIconModule, MdListModule, MdProgressBarModule, MdTabsModule, MdSnackBarModule
} from '@angular/material';
// TODO: UPGRADE npm install ngx-infinite-scroll --save for angular 4
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { RatingModule } from 'ngx-rating';
import { ImageUploadModule } from 'angular2-image-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
// import { ImageUploadModule } from 'ng2-imageupload';
// TODO: https://github.com/benjaminbrandmeier/angular2-image-gallery use this library for gallery
import { environment } from '../environments/environment';

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
  MapComponent
} from './components';
import { FitContentsDirective } from './directives';
import { EllipsisPipe, KeysPipe, KeysOrderPipe, ChunkPipe } from './pipes';
import { AuthService, BlogService, ShopService, UtilService, LocationService, RoomService } from './services';
import { AuthEffects, BlogEffects, LocationEffects, RoomEffects } from './store';
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
    path: 'rooms',
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
    MapComponent,
    FitContentsDirective,
    EllipsisPipe,
    KeysPipe,
    KeysOrderPipe,
    ChunkPipe
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
    MdToolbarModule, MdIconModule, MdListModule, MdProgressBarModule, MdTabsModule, MdSnackBarModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    InfiniteScrollModule,
    RatingModule,
    ImageUploadModule.forRoot(),
    ImageCropperModule,
    // ImageUploadModule,
    EffectsModule.run(AuthEffects),
    EffectsModule.run(BlogEffects),
    EffectsModule.run(LocationEffects),
    EffectsModule.run(RoomEffects),
    // DBModule.provideDB(schema),
  ],
  providers: [
    AuthGuard,
    AuthService,
    BlogService,
    ShopService,
    LocationService,
    RoomService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
