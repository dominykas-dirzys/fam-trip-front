import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Room} from '../../types/types';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  room: Room;
  newRoomForm: FormGroup;
  id: number;

  constructor(private route: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.roomid;
      }
    );
    console.log(this.id);

    this.room = history.state;

    console.log(this.room);

    this.newRoomForm = new FormGroup({
      roomType: new FormControl(null, Validators.required),
      size: new FormControl(null),
      roomCondition: new FormControl(null),
      remarks: new FormControl(null)
    });
    console.log(this.route.params['id']);
  }

  onSubmit() {
    console.log(this.newRoomForm);
  }
}
