import {Component, OnInit} from '@angular/core';
import {Room} from '../../types/types';
import {RoomEditComponent} from '../room-edit/room-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private static readonly URL = '/api/rooms/';
  id;

  rooms: Room[];
  room: Room;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load();
  }

  load() {
    this.api.get(RoomComponent.URL + this.id).subscribe((data: Room) => this.room = data);
    this.api.get(RoomComponent.URL).subscribe((data: Room[]) => this.rooms = data);
  }

  openDialog(room?: Room) {
    const dialogRef = this.dialog.open(RoomEditComponent, {
      width: '100%',
      data: room || {}
    });

    dialogRef.afterClosed().subscribe((data: Room) => {
      if (!data) {
        return;
      }

      const index = this.rooms.findIndex(r => r.id === data.id);
      if (index < 0) {
        this.rooms = [...this.rooms, data];
      } else {
        this.rooms = this.rooms.map(r => r.id === data.id ? data : r);
      }

      this.load();
    });
  }
}
