import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

import { ApiService } from './api.service';
import { TOKEN_KEY } from '../common/constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {User} from '../shared/models/user.model';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  private token: string;

  error: string;

  redirectUrl: string;

  tokenExpirationTimer: any;

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
        }), tap((resData: {token: string}) => {
          this.handleAuthentication(resData.token);
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
        this.error = error;
        this.snackBar.open('Invalid credentials', 'Change and try again', {
          duration: 4000,
          verticalPosition: 'top',
        });
      });
    });
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.token = null;
    sessionStorage.setItem(TOKEN_KEY, null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    localStorage.removeItem('authorId');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(token: string) {
    const tokenFromRes: {sub: string; exp: number; iat: number; jti: string; } = jwt_decode(token);
    const expDate = new Date(tokenFromRes.exp * 1000);
    const userFromToken = new User(tokenFromRes.sub, tokenFromRes.jti, token, expDate);
    this.user.next(userFromToken);
    this.autoLogout((tokenFromRes.exp - tokenFromRes.iat) * 1000);
    localStorage.setItem('userData', JSON.stringify(userFromToken));
  }

  canEditCheck(authorId: number): boolean {
    let userId;
    this.user.subscribe(data => {
      if (data) {
        userId = +data.id;
      }
    });
    if (authorId === userId) {
      return true;
    } else {
      return false;
    }
  }
}
