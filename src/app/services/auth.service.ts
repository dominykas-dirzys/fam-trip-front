import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { TOKEN_KEY } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  redirectUrl: string;

  constructor(private api: ApiService) {
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
      this.api.post('/login', user).subscribe((response: { token: string }) => {
        if (response?.token) {
          const { token } = response;
          this.token = token;
          sessionStorage.setItem(TOKEN_KEY, token);
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }

  logout() {
    this.token = null;
    sessionStorage.setItem(TOKEN_KEY, null);
  }
}
