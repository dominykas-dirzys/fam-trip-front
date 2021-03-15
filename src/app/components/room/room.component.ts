import {Component, OnInit} from '@angular/core';
import {Room} from '../../types/types';
import {RoomFormComponent} from '../room-form/room-form.component';
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

  rooms: Room[];
  room: Room;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.get(RoomComponent.URL + id).subscribe((data: Room) => this.room = data);
    this.api.get(RoomComponent.URL).subscribe((data: Room[]) => this.rooms = data);
  }

  openDialog(room?: Room) {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '100%',
      data: room || {}
    });

    dialogRef.afterClosed().subscribe((data: Room) => {
      if (data && data.id) {
        this.api.post(RoomComponent.URL, data).subscribe(
          (result: Room) => this.rooms = this.rooms.map(r => r.id === result.id ? result : r)
        );
        this.room = data;
      } else if (data) {
        this.api.post(RoomComponent.URL, data).subscribe(
          (result: Room) => this.rooms = [...this.rooms, result]
        );
        this.room = data;
      }
    });
  }
}
