import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CharacterState } from '../state/character.state';
import { MonsterState } from '../state/monster.state';
import { UserState } from '../state/user.state';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  isCollapsed = true;

  
  user$: Observable<any> = this.store.select(UserState);
  character$: Observable<any> = this.store.select(CharacterState);
  monster$: Observable<any> = this.store.select(MonsterState);


  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, private store: Store) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.accountService.getIsAuth(); 
    this.authListenerSubs = this.accountService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  login() {
    this.accountService.login(this.model)
  }

  logout() {
  this.accountService.logout();
}
}
