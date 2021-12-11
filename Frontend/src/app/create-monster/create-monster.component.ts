import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_Services/account.service';
import { MonsterService } from '../_Services/monster.service';

@Component({
  selector: 'app-create-monster',
  templateUrl: './create-monster.component.html',
  styleUrls: ['./create-monster.component.css']
})
export class CreateMonsterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter;
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private monsterService: MonsterService, private fb: FormBuilder) {}

  ngOnInit(): void {
  this.initialiseForm();
  }

  initialiseForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      hp: ['', Validators.required],
      hpMax: ['', Validators.required],
      dmg: ['', Validators.required],
      attack: ['', Validators.required],
      evasion: ['', Validators.required],
      armour: ['', Validators.required],
      xp: ['', Validators.required],
      gold: ['', Validators.required],
    })
  }

  createMonster() {
    this.monsterService.createNewMonster(this.registerForm.value)
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
