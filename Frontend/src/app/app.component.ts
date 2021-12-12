import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(private accountService: AccountService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("Solaria Idle");
    this.accountService.autoAuthUser();
  }
}
