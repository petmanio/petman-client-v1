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
import { MaterialModule } from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { JoinComponent } from './components/join/join.component';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { KeysOrderPipe } from './pipes/keys-order/keys-oder.pipe';
import { ChunkPipe } from './pipes/chunk/chunk.pipe';

import { AuthService } from './services/auth/auth.service';
import { BlogService } from './services/blog/blog.service';
import { UtilService } from './services/util/util.service';
import { AuthEffects } from './store/auth/auth.effects';
import { BlogEffects } from './store/blog/blog.effects';
import { AuthGuard } from './guards/auth.guard';

import { reducer } from './store';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS']
    }
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard],
    data: {
      auth: true,
      toolbarRightButtons: ['ACTIONS']
    }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: {
      auth: false,
      toolbarRightButtons: ['JOIN']
    }
  },
  {
    path: 'join',
    component: JoinComponent,
    canActivate: [AuthGuard],
    data: {
      auth: false
    }
  },
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
    JoinComponent,
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
    RouterModule.forRoot(appRoutes, { useHash: true }),
    MaterialModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(BlogEffects),
    // DBModule.provideDB(schema),
  ],
  providers: [
    AuthGuard,
    AuthService,
    BlogService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
