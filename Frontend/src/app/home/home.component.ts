import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  modalRef?: BsModalRef;
  model: any = {}

  constructor() {
  }

  ngOnInit(): void {
  }

  cancelRegisteredMode(event: boolean) {
    this.registerMode = event;
    this.modalRef?.hide()
  }

  cancelLoginMode(event: boolean) {
    this.registerMode = event;
    this.modalRef?.hide()
  }

}
