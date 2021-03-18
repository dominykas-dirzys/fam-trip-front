import {Component, OnInit} from '@angular/core';
import {Hotel} from '../../types/types';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HotelFormComponent} from '../hotel-form/hotel-form.component';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  private static readonly URL = '/api/hotels/';
  private id;

  hotel: Hotel;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.get(HotelComponent.URL + this.id).subscribe((data: Hotel) => this.hotel = data);
  }

  openDialog() {
      const dialogRef = this.dialog.open(HotelFormComponent, {
        width: '100%',
        data: this.hotel || {}
      });

      dialogRef.afterClosed().subscribe((data: Hotel) => {
        if (!data) {
          return;
        }

        this.api.get(HotelComponent.URL + this.id).subscribe((dataReceived: Hotel) => this.hotel = dataReceived);
      });
  }

  delete() {
    if (confirm('Are you sure you wish to delete ' + this.hotel.name + '?')) {
      this.api.delete(HotelComponent.URL + this.id).subscribe(
        () => this.router.navigate(['/hotels']) ,
        err => this.api.deleteResult(err)
      );
    }

  }
}
