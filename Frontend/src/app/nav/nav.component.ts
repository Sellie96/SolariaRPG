import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CharacterState } from '../state/character.state';
import { MonsterState } from '../state/monster.state';
import { UserState } from '../state/user.state';
import { Character } from '../_modules/Character';
import { AccountService } from '../_Services/account.service';

@UntilDestroy()
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  
  user$: Observable<any> = this.store.select(UserState);
  character$: Observable<any> = this.store.select(CharacterState);
  monster$: Observable<any> = this.store.select(MonsterState);

  player?: Character;

  constructor(public accountService: AccountService, private store: Store) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.accountService.getIsAuth(); 
    this.authListenerSubs = this.accountService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.loadCharacter();
  }


  async loadCharacter() {
    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: Character) => {

        this.player = {...character};
      });
  }

  logout() {
  this.accountService.logout();
}
}
