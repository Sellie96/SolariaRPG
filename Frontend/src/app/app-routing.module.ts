import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { DungeonsComponent } from './dungeons/dungeons.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { QuestsComponent } from './quests/quests.component';
import { ShopComponent } from './shop/shop.component';
import { TownComponent } from './town/town.component';
import { AuthGuard } from './_Guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},

{
  path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [
    {path: 'town', component: TownComponent},
    {path: 'quests', component: QuestsComponent},
    {path: 'dungeons', component: DungeonsComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'battle', component: BattleComponent},
    {path: 'messages', component: MessagesComponent},
  ]
},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
