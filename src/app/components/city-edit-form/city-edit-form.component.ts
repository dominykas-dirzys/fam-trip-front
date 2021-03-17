import {Component, Inject, OnInit} from '@angular/core';
import {City, Country} from '../../types/types';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CityService} from '../../services/city.service';
import {ApiService} from '../../services/api.service';
import {CountryService} from '../../services/country.service';

@Component({
  selector: 'app-city-edit-form',
  templateUrl: './city-edit-form.component.html',
  styleUrls: ['./city-edit-form.component.css']
})
export class CityEditFormComponent implements OnInit {

  countries: Country[] = [];

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CityEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: City,
    private cityService: CityService,
    private api: ApiService,
    private countryService: CountryService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.fetchCountries();
    this.initForm();
  }

  fetchCountries() {
    this.countryService.findAll().subscribe((
      data: Country[]) => {
        this.countries = data.sort((a, b) => a.title.localeCompare(b.title));
      }
    );
  }

  initForm() {
    this.form = new FormGroup({
      country: new FormControl(this.data.country, [
        Validators.required
      ]),
      title: new FormControl(this.data.title, [
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
    this.cityService.post({...this.data, ...this.form.getRawValue()}).subscribe(
      (result: City) => this.dialogRef.close(result),
      err => this.api.setValidationResult(err, this.form)
    );
  }

}
