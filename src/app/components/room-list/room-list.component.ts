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

  displayedColumns: string[] = ['position', 'roomType', 'type', 'actions'];

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    console.log('this.id:');
    console.log(this.id);
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
    });
  }

  delete(id: number) {
    this.api.delete(RoomListComponent.URL + id).subscribe(
      () => this.rooms = this.rooms.filter(item => item.id !== id)
    );
  }
}
