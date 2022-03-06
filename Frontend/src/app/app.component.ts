import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from './state/user.state';
import { AccountService } from './_Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Solaria RPG';
  users: any;
  count: number;
  showNav: false;
  auth = "";

  user$: Observable<any> = this.store.select(UserState);

  constructor(private accountService: AccountService, private titleService: Title, private store: Store, private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle("Solaria Idle");
    this.accountService.autoAuthUser();
    this.auth = localStorage.getItem("userId");
  }

  getShowNav() {
    if (window.location.pathname === ('/') || window.location.pathname === ('/character-select')) {
      return false
    }
    else return true
  }
}
