import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {Hotel} from '../../types/types';
import {HotelFormComponent} from '../hotel-form/hotel-form.component';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  private static readonly URL = '/api/hotels';

  displayedColumns: string[] = ['position', 'name', 'city', 'officialRating', 'inspectionScore', 'labels', 'actions'];

  hotels: Hotel[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.load();
  }

  delete(id: number) {
    this.api.delete(HotelListComponent.URL + '/' + id).subscribe(
      () => this.hotels = this.hotels.filter(item => item.id !== id)
    );
  }

  private load() {
    this.api.get(HotelListComponent.URL).subscribe((data: Hotel[]) => this.hotels = data);
  }

  openDialog(hotel?: Hotel) {
    const dialogRef = this.dialog.open(HotelFormComponent, {
      width: '100%',
      data: hotel || {}
    });

    dialogRef.afterClosed().subscribe((data: Hotel) => {
      if (data && data.id) {
        this.api.post(HotelListComponent.URL, data).subscribe(
          (result: Hotel) => this.hotels = this.hotels.map(h => h.id === result.id ? result : h)
        );
      } else if (data) {
        this.api.post(HotelListComponent.URL, data).subscribe(
          (result: Hotel) => this.hotels = [...this.hotels, result]
        );
      }
    });
  }
}
