import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HotelComponent} from './components/hotel/hotel.component';
import {RoomComponent} from './components/room/room.component';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {RoomListComponent} from './components/room-list/room-list.component';

const routes: Routes = [
  {
    path: 'hotels',
    component: HotelListComponent
  },
  {
    path: 'hotels/:id',
    component: HotelComponent
  },
  {
    path: 'rooms',
    component: RoomListComponent
  },
  {
    path: 'rooms/:id',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
