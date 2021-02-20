import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {Hotel} from '../../types/types';

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

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.api.delete(HotelListComponent.URL + '/' + id).subscribe(
      () => this.hotels = this.hotels.filter(item => item.id !== id)
    );
  }

  // tslint:disable-next-line:typedef
  private load() {
    this.api.get(HotelListComponent.URL).subscribe((data: Hotel[]) => this.hotels = data);
  }
}
