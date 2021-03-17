import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {User} from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fam-trip-front-end';
  private userSub: Subscription;
  isAuthenticated = false;
  user: string;

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.autoLogin();

    this.userSub = this.authService.user.subscribe(user => {
      console.log(user);
      this.isAuthenticated = !!user;
      if (user) {
        this.user = user.email;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
