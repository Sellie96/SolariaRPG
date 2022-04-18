import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter;
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private fb: FormBuilder) {}

  ngOnInit(): void {
  this.initialiseForm();
  }

  initialiseForm() {
    this.registerForm = this.fb.group({
      gamemode: ['Normal'],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
      ? null: {isMatching: true}
    }

  }

  register() {
    this.cancelRegister.emit();
    this.accountService.register(this.registerForm.value)
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
