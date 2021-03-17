import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {City, Country} from '../../types/types';
import {CityService} from '../../services/city.service';
import {CountryService} from '../../services/country.service';
import {ApiService} from '../../services/api.service';
import {CityListComponent} from '../city-list/city-list.component';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {

  countries: Country[] = [];
  cities: City[] = [];

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: City,
    private cityService: CityService,
    private api: ApiService,
    private countryService: CountryService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchCities();
    this.initForm();
  }

  fetchCountries() {
    this.countryService.findAll().subscribe((
      data: Country[]) => {
        this.countries = data.sort((a, b) => a.title.localeCompare(b.title));
      }
    );
  }

  fetchCities() {
    this.cityService.findAll().subscribe((
      data: City[]) => {
      this.cities = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      country: new FormControl(this.countries, [
        Validators.required
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  get country() {
    return this.form.get('country');
  }

  get title() {
    return this.form.get('title');
  }

  openDialog() {
    const dialogRef = this.dialog.open(CityListComponent, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe((data: City) => {
      if (!data) {
        return;
      }

      // const index = this.cities.findIndex(c => c.id === data.id);
      // if (index < 0) {
      //   this.cities = [...this.cities, data];
      // } else {
      //   this.cities = this.cities.map(c => c.id === data.id ? data : c);
      // }
      this.fetchCities();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.cityService.post({...this.data, ...this.form.getRawValue()}).subscribe(
      (result: City) => this.dialogRef.close(result),
      err => this.api.setValidationResult(err, this.form)
    );
  }
}
