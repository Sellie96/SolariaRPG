import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(private accountService: AccountService, private titleService: Title, private store: Store) {}

  ngOnInit() {
    this.titleService.setTitle("Solaria Idle");
    let test = this.accountService.autoAuthUser();
    this.auth = localStorage.getItem("userId");
    
  }
}
