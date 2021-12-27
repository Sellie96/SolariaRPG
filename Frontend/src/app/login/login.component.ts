import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter;
  modalRef?: BsModalRef;
  model: any = {}

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.cancelLogin.emit();
    this.accountService.login(this.model)
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

}
