import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {City, Country} from '../../types/types';
import {CityService} from '../../services/city.service';
import {CountryService} from '../../services/country.service';

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
        console.log(this.countries);
      }
    );
  }

  fetchCities() {
    this.cityService.findAll().subscribe((
      data: City[]) => {
      this.cities = data;
      console.log(this.cities);
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

  cancel() {
    this.dialogRef.close();
  }

  save() {
    console.log('Save method run');
    console.log(this.form.getRawValue());
    this.dialogRef.close({...this.data, ...this.form.getRawValue()});
  }
}
