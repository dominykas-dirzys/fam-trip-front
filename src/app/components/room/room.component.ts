import {Component, OnInit} from '@angular/core';
import {Room} from '../../types/types';
import {RoomEditComponent} from '../room-edit/room-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.room = history.state;
  }

  openDialog(room?: Room) {
    const dialogRef = this.dialog.open(RoomEditComponent, {
      width: '100%',
      data: room || {}
    });
  }
}
