import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
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
    this.authService.login(this.form.getRawValue()).subscribe(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl(this.authService.redirectUrl || '');
      }
    });
  }

  signup() {
    this.authService.signup(this.form.getRawValue()).subscribe(() => {
    },
      errorRes => {
      if (errorRes.error.items != null || undefined) {
        if (errorRes.error.items.email === 'Such user exits already') {
          this.snackBar.open('User with this email already exists', 'Try again', {
            duration: 4000,
            verticalPosition: 'top',
          });
        }
      } else {
        this.snackBar.open('System error', 'Try again', {
          duration: 4000,
          verticalPosition: 'top',
        });
      }
    },
      () => {
        this.snackBar.open('Sign up successful!', 'Got it!', {
          duration: 4000,
          verticalPosition: 'top',
        });
      });
    this.form.reset();
    this.onSwitchMode();
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
