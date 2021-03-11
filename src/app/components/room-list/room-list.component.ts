import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Room} from '../../types/types';
import {MatDialog} from '@angular/material/dialog';
import {RoomEditComponent} from '../room-edit/room-edit.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  private static readonly URL = '/api/rooms/';

  @Input() rooms: Room[];
  room: Room;
  id: number;

  constructor(private api: ApiService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['position', 'roomType', 'actions'];

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  openDialog(room?: Room) {
    console.log(this.rooms);
    const dialogRef = this.dialog.open(RoomEditComponent, {
      width: '100%',
      data: room || {}
    });

    dialogRef.afterClosed().subscribe((data: Room) => {
      if (data) {
        data.hotelId = this.id;
        this.api.post(RoomListComponent.URL, data).subscribe(
          (result: Room) => this.rooms = [...this.rooms, result]
        );
      }
    });
  }
}
