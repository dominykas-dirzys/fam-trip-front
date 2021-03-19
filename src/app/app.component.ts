import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {Hotel} from './types/types';
import {HotelFormComponent} from './components/hotel-form/hotel-form.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

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

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.autoLogin();

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) {
        this.user = user.email;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  openDialog(hotel?: Hotel) {
    const dialogRef = this.dialog.open(HotelFormComponent, {
      width: '100%',
      data: hotel || {}
    });

    dialogRef.afterClosed().subscribe((data: Hotel) => {
      if (!data) {
        return;
      } else {
        this.router.navigate(['/hotels/', data.id]);
      }
    });
  }
}
