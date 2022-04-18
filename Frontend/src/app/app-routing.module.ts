import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { CreateMonsterComponent } from './create-monster/create-monster.component';
import { CreateItemComponent } from './create-item/create-item.component';
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
import { BackpackComponent } from './backpack/backpack.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

{
  path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [
    {path: 'town', component: TownComponent, },
    {path: 'backpack', component: BackpackComponent, },
    {path: 'quests', component: QuestsComponent},
    {path: 'dungeons', component: DungeonsComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'battle', component: BattleComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'character-select', component: CharacterCreationComponent},
  ]
},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'create-monster', component: CreateMonsterComponent},
  {path: 'create-item', component: CreateItemComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: NoPreloading,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
