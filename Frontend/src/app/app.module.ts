import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BattleComponent } from './battle/battle.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { CharacterState } from './state/character.state';
import { ShopComponent } from './shop/shop.component';
import { DungeonsComponent } from './dungeons/dungeons.component';
import { QuestsComponent } from './quests/quests.component';
import { TownComponent } from './town/town.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { UserState } from './state/user.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { CreateMonsterComponent } from './create-monster/create-monster.component';
import { MonsterState } from './state/monster.state';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { LoadingBarModule, LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TextInputComponent,
    DateInputComponent,
    CharacterCreationComponent,
    BattleComponent,
    ShopComponent,
    DungeonsComponent,
    QuestsComponent,
    TownComponent,
    CharacterCreationComponent,
    CreateMonsterComponent,
    CreateMonsterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxNavbarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    LoadingBarModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgxsModule.forRoot([
      CharacterState,
      UserState,
      MonsterState
    ], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 0 } },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
