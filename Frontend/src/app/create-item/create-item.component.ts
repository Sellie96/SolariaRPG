import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../_Services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
})
export class CreateItemComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private itemService: ItemService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      level: ['', Validators.required],
      damage: [''],
      accuracy: [''],
      maxHp: [''],
      armour: [''],
      value: ['']
    });
  }

  createItem() {
    this.itemService.createItem(this.registerForm.value)
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
