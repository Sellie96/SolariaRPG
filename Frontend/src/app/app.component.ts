import { Component, OnInit } from '@angular/core';
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

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.autoAuthUser();
    this.mainGame();
  }

  gameLoop(){
    this.count = 10;
  }

  mainGame() {
    setInterval(this.gameLoop, 1000);
  }
}
