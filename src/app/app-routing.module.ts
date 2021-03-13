import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HotelComponent} from './components/hotel/hotel.component';
import {RoomComponent} from './components/room/room.component';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {RoomListComponent} from './components/room-list/room-list.component';
import {HotelFormComponent} from './components/hotel-form/hotel-form.component';
import {LoginComponent} from './components/login/login.component';
import {GuardService} from './services/guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'hotels',
    canActivate: [GuardService],
    component: HotelListComponent
  },
  {
    path: 'hotels/:id',
    canActivate: [GuardService],
    component: HotelComponent
  },
  {
    path: 'rooms',
    canActivate: [GuardService],
    component: RoomListComponent
  },
  {
    path: 'rooms/:id',
    canActivate: [GuardService],
    component: RoomComponent
  },
  {
    path: 'addHotel',
    canActivate: [GuardService],
    component: HotelFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
