import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HotelComponent} from './components/hotel/hotel.component';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {RoomComponent} from './components/room/room.component';
import {RoomListComponent} from './components/room-list/room-list.component';
import {LoginComponent} from './components/login/login.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HotelListComponent,
    RoomComponent,
    RoomListComponent,
    LoginComponent,
    PageTitleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
