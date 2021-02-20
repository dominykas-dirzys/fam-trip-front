import { Component, OnInit } from '@angular/core';
import {Hotel} from "../../types/types";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  private static readonly URL = '/api/hotels/'

  hotel: Hotel;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.get(HotelComponent.URL + id).subscribe((data: Hotel) => this.hotel = data);
  }

}
