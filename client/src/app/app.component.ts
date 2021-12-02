import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Website App';
  users: any;
  count: number;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.mainGame();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user') ?? '');
    this.accountService.setCurrentUser(user);
  }

  gameLoop(){
    this.count = 10;
  }

  mainGame() {
    setInterval(this.gameLoop, 1000);
  }
}
