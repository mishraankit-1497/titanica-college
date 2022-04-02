import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { toastAlert } from '../toaster/toaster.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let emailId = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.userService.getUsers().subscribe((users: any) => {
        users.find((user: any) => {
          if (user.email === emailId && user.password === password) {
            this.isLoggedIn = true;
          }
        });
        if (this.isLoggedIn) {
          toastAlert('success', 'Signed in successfully');
          this.router.navigate(['home']);
        } else {
          toastAlert('error', 'Invalid credentials');
        }
      });
    } else {
      toastAlert('error', 'Invalid form');
    }
  }
}
