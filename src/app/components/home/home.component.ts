import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {Hotel} from '../../types/types';
import {HotelFormComponent} from '../hotel-form/hotel-form.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  user: string;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
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
