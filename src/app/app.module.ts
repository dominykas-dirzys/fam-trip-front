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
import {RoomFormComponent} from './components/room-form/room-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {HotelFormComponent} from './components/hotel-form/hotel-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {CityFormComponent} from './components/city-form/city-form.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {OffRatingPipe} from './pipes/off-rating.pipe';
import {LabelsArrayPipe} from './pipes/labels-array.pipe';
import {LabelsPipe} from './pipes/labels.pipe';
import {RecToPipe} from './pipes/rec-to.pipe';
import {SizePipe} from './pipes/size.pipe';
import {FoodQltPipe} from './pipes/food-qlt.pipe';
import {CuisinePipe} from './pipes/cuisine.pipe';
import {CheckmarkPipe} from './pipes/checkmark.pipe';
import {RoomTypePipe} from './pipes/room-type.pipe';
import {RoomConditionPipe} from './pipes/room-condition.pipe';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityEditFormComponent } from './components/city-edit-form/city-edit-form.component';

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
    RoomFormComponent,
    HotelFormComponent,
    LoadingSpinnerComponent,
    HotelFormComponent,
    CityFormComponent,
    OffRatingPipe,
    LabelsArrayPipe,
    LabelsPipe,
    RecToPipe,
    SizePipe,
    FoodQltPipe,
    CuisinePipe,
    CheckmarkPipe,
    RoomTypePipe,
    RoomConditionPipe,
    CityListComponent,
    CityEditFormComponent
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
    MatSlideToggleModule,
    MatSlideToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
