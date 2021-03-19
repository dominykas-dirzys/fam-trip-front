import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Hotel, Room} from '../../types/types';
import {MatDialog} from '@angular/material/dialog';
import {RoomFormComponent} from '../room-form/room-form.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit, OnChanges {

  private static readonly URL = '/api/rooms/';

  @Input() rooms: Room[];
  @Input() hotel: Hotel;
  id: number;
  canEdit = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  displayedColumns: string[] = ['position', 'roomType', 'actions'];

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges() {
    if (this.hotel) {
      this.canEdit = this.authService.canEditCheck(this.hotel.author.id);
      localStorage.setItem('authorId', this.hotel.author.id.toString());
    }
  }

  openDialog(room?: Room) {
    const dialogRef = this.dialog.open(RoomFormComponent, {
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

  delete(id: number) {
    this.api.delete(RoomListComponent.URL + id).subscribe(
      () => this.rooms = this.rooms.filter(item => item.id !== id)
    );
  }
}
