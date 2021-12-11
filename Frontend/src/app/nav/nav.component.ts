import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  model: any = {}
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  isCollapsed = true;

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.accountService.getIsAuth();
    this.authListenerSubs = this.accountService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.accountService.login(this.model)
  }

  logout() {
  this.accountService.logout();
  this.router.navigateByUrl('/')
}
}
