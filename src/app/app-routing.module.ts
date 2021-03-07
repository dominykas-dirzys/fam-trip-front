import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HotelComponent} from './components/hotel/hotel.component';
import {RoomComponent} from './components/room/room.component';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {RoomListComponent} from './components/room-list/room-list.component';
import {RoomEditComponent} from './components/room-edit/room-edit.component';

const routes: Routes = [
  {
    path: 'hotels',
    component: HotelListComponent
  },
   {
    path: 'hotels/:hotelid',
    component: HotelComponent
  },
  {
    path: 'hotels/:hotelid/rooms',
    component: RoomListComponent, children: [
      { path: 'new_room', component: RoomEditComponent }
    ]
  },
  {
    path: 'hotels/:hotelid/rooms/:roomid',
    component: RoomComponent, children: [
      { path: 'edit', component: RoomEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
