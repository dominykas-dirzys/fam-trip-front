import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Hotel, Room} from '../../types/types';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  @Input() rooms: Room[];

  constructor() {
  }

  displayedColumns: string[] = ['position', 'roomType', 'actions'];

  ngOnInit(): void {
  }
}
