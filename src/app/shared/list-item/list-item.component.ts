import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CuisineType, FoodQuality, HotelLabel, HotelRating, RecommendedTo, Room, Size, User} from "../../types/types";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() id: number;
  @Input() selected: number;
  @Input() name: string;
  @Input() officialRating: HotelRating;
  @Input() inspectionScore: number;
  @Input() foodQuality: FoodQuality;
  @Input() territorySize: Size;
  @Input() waterSlides: boolean;
  @Input() spa: boolean;
  @Input() distanceToBeach: number;
  @Input() distanceFromAirport: number;
  @Input() remarks: string;
  @Input() author: User;
  @Input() rooms: Room[];
  @Input() recommendedTos: RecommendedTo[];
  @Input() labels: HotelLabel[];
  @Input() cuisineTypes: CuisineType[];
  @Output() selectItem = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  remove() {
    this.removeItem.emit(this.id);
  }

  select() {
    this.selectItem.emit(this.id);
  }

}
