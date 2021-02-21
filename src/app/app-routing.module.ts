import {Router, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HotelComponent} from './components/hotel/hotel.component';
import {RoomComponent} from './components/room/room.component';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {GuardService} from './services/guard.service';
import {CityGroupComponent} from './components/city-group/city-group.component';

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
    component: RoomComponent
  },
  {
    path: 'cityForm',
    component: CityGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
