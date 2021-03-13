import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.form.getRawValue()).subscribe(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl(this.authService.redirectUrl || '');
      }
      this.isLoading = false;
    },
      error => {
      console.log(error);
      this.isLoading = false;
      });
  }

  signup() {
    this.isLoading = true;
    this.authService.signup(this.form.getRawValue()).subscribe(() => {
      this.isLoading = false;
    },
      errorRes => {
        this.error = errorRes.error.items.email;
        console.log(errorRes);
        this.isLoading = false;
    });
    this.form.reset();
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
