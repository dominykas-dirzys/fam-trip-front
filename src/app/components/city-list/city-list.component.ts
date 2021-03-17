import {Component, OnInit} from '@angular/core';
import {CityService} from '../../services/city.service';
import {City} from '../../types/types';
import {CityEditFormComponent} from '../city-edit-form/city-edit-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: City[] = [];

  constructor(private cityService: CityService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'country', 'title', 'actions'];

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities() {
    this.cityService.findAll().subscribe((
      data: City[]) => {
      this.cities = data;
      console.log(this.cities);
    });
  }

  openDialog(city?: City) {
    const dialogRef = this.dialog.open(CityEditFormComponent, {
      width: '100%',
      data: city || {}
    });

    dialogRef.afterClosed().subscribe((data: City) => {
      if (!data) {
        return;
      }

      const index = this.cities.findIndex(c => c.id === data.id);
      if (index < 0) {
        this.cities = [...this.cities, data];
      } else {
        this.cities = this.cities.map(c => c.id === data.id ? data : c);
      }

      this.fetchCities();
    });
  }

  delete(id: number) {
    this.cityService.delete(id).subscribe(
      () => this.cities = this.cities.filter(item => item.id !== id)
    );
  }
}