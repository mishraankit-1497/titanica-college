import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  emailValidation1,
  lastNameValidation1,
  nameValidation1,
  passwordValidation,
  phoneNumberValidation,
} from 'src/app/inputValidation';
import { UsersService } from 'src/app/services/users.service';
import { toastAlert } from '../toaster/toaster.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  disabled: boolean = true;
  firstName: string = '';
  lastName: string = '';
  contact: any;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: [9999999999, Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const user = this.signUpForm.value;
      this.userService.addUser(user).subscribe((data: any) => {
        toastAlert('success', 'Registered successfully');
        this.router.navigate(['login']);
      });
    } else {
      toastAlert('error', 'Invalid form');
    }
  }

  onFirstNameChange() {
    let returnedValue = nameValidation1(this.signUpForm.value.firstName);
    this.firstName = returnedValue.res ? '' : returnedValue?.error;
  }

  onLastNameChange() {
    let returnedValue = lastNameValidation1(this.signUpForm.value.lastName);
    this.lastName = returnedValue.res ? '' : returnedValue?.error;
    console.log(this.lastName);
  }

  onContactChange() {
    let returnedValue = phoneNumberValidation(this.signUpForm.value.contactNo);
    this.contact = returnedValue.res ? '' : returnedValue?.error;
  }

  onEmailChange() {
    let returnedValue = emailValidation1(this.signUpForm.value.email);
    this.email = returnedValue.res ? '' : returnedValue?.error;
  }

  onPasswordChange() {
    let returnedValue = passwordValidation(this.signUpForm.value.password);
    this.password = returnedValue.res ? '' : returnedValue?.error;
  }
  onConfirmPasswordChange() {
    if (
      !this.password &&
      this.signUpForm.value.password === this.signUpForm.value.confirmPassword
    ) {
      this.disabled = false;
      this.confirmPassword = '';
    } else {
      this.confirmPassword = 'Password does not match';
    }
  }
}
