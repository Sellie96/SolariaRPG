import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditsComponent } from './members/member-edits/member-edits.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_Guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_Guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},

{
  path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [
    {path: 'players', component: MemberListComponent,},
    {path: 'players/:username', component: MemberDetailComponent},
    {path: 'players/edit', component: MemberEditsComponent, canDeactivate: [PreventUnsavedChangesGuard]},
    {path: 'battle', component: ListsComponent},
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
