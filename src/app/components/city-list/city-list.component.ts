import {Component, OnInit} from '@angular/core';
import {CityService} from '../../services/city.service';
import {City} from '../../types/types';
import {CityEditFormComponent} from '../city-edit-form/city-edit-form.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: City[] = [];

  constructor(
    private cityService: CityService,
    private dialogRef: MatDialogRef<CityListComponent>,
    public dialog: MatDialog,
    private api: ApiService) {
  }

  displayedColumns: string[] = ['country', 'title', 'actions'];

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities() {
    this.cityService.findAll().subscribe((
      data: City[]) => {
      this.cities = data;
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
    if (confirm('Are you sure you wish to delete this city?')) {
      this.cityService.delete(id).subscribe(
        () => this.cities = this.cities.filter(item => item.id !== id),
        err => this.api.deleteResult(err)
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
