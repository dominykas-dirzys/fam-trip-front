import {Component, OnInit} from '@angular/core';
import {Hotel, Room} from '../../types/types';
import {RoomEditComponent} from '../room-edit/room-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private static readonly URL = '/api/rooms/';

  room: Room;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.api.get(RoomComponent.URL + id).subscribe((data: Room) => this.room = data);
    this.room = history.state;
  }

  openDialog(room?: Room) {
    const dialogRef = this.dialog.open(RoomEditComponent, {
      width: '100%',
      data: room || {}
    });
  }
}
