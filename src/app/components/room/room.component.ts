import {Component, OnInit} from '@angular/core';
import {Room} from '../../types/types';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor() {
  }

  ngOnInit(): void {
    this.room = history.state;
  }

}
