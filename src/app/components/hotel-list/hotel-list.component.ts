import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {Hotel} from "../../types/types";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  private static readonly URL = '/api/hotels';

  displayedColumns: string[] = ['position', 'name', 'city', 'officialRating', 'inspectionScore', 'foodQuality', 'territorySize'];
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
}
