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
import {PageTitleComponent} from './shared/page-title/page-title.component';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {ListHeaderComponent} from './shared/list-header/list-header.component';
import {ListItemComponent} from './shared/list-item/list-item.component';
import {RoomEditComponent} from './components/room-edit/room-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {HotelFormComponent} from './components/hotel-form/hotel-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CityFormComponent} from './components/city-form/city-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HotelListComponent,
    RoomComponent,
    RoomListComponent,
    LoginComponent,
    PageTitleComponent,
    ListHeaderComponent,
    ListItemComponent,
    RoomEditComponent,
    HotelFormComponent,
    CityFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
