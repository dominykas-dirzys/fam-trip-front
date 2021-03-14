import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

import { ApiService } from './api.service';
import { TOKEN_KEY } from '../common/constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  error: string;

  redirectUrl: string;

  constructor(private api: ApiService, private snackBar: MatSnackBar, private router: Router) {
    this.token = sessionStorage.getItem(TOKEN_KEY);
  }

  signup(user) {
    return this.api.post('/sign-up', user);
  }

  isLoggedIn() {
    return !!this.token;
  }

  login(user): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.api.post('/login', user)
        .pipe(catchError(errorRes => {
          const errorMessage = errorRes.error.details;
          return throwError(errorMessage);
        }))
        .subscribe((response: { token: string }) => {
        if (response?.token) {
          const { token } = response;
          this.token = token;
          sessionStorage.setItem(TOKEN_KEY, token);
          observer.next(true);
        } else {
          observer.next(false);
        }
      },
        error => {
        console.log(error);
        this.error = error;
        this.snackBar.open('Invalid credentials', 'Change and try again', {
          duration: 4000,
          verticalPosition: 'top',
        });
      });
    });
  }

  logout() {
    console.log(this.token);
    this.token = null;
    sessionStorage.setItem(TOKEN_KEY, null);
    console.log(this.token);
    this.router.navigate(['/login']);
  }
}
