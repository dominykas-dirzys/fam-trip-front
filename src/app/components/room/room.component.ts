import {Component, OnInit} from '@angular/core';
import {Room} from '../../types/types';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.room = history.state;
  }

}
