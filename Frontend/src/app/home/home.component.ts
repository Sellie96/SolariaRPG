import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.registerMode = !this.registerMode;
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisteredMode(event: boolean) {
    this.registerMode = event;
    this.modalRef?.hide()
  }

}
