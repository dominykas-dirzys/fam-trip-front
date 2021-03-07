import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room, User} from "../../types/types";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() id: number;
  @Input() selected: number;
  @Input() name: string;
  @Input() officialRating: number;
  @Input() inspectionScore: number;
  @Input() foodQuality: string;
  @Input() territorySize: string;
  @Input() waterSlides: boolean;
  @Input() spa: boolean;
  @Input() distanceToBeach: number;
  @Input() distanceFromAirport: number;
  @Input() remarks: string;
  @Input() author: User;
  @Input() rooms: Room[];
  @Input() recommendedTos: string[];
  @Input() labels: string[];
  @Input() cuisineTypes: string[];
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
