import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {City, Hotel} from '../../types/types';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface CityGroup {
  country: string;
  cities: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  form:  FormGroup = this._formBuilder.group({
    cityGroup: '',
  });

  // cities: City[] = [];

  cityGroups: CityGroup[] = [{
    country: 'Lithuania',
    cities: ['Kaunas', 'Klaipeda', 'Palanga', 'Vilnius']
  }, {
    country: 'Turkey',
    cities: ['Bodrum', 'Kemer']
  }];

  cityGroupOptions: Observable<CityGroup[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HotelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hotel
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(2)
      ]),
      officialRating: new FormControl(this.data.officialRating, [
        Validators.required
      ]),
      cityGroup: new FormControl(this._formBuilder.group({
        cityGroup: ''})
      )
    });

    this.cityGroupOptions = this.form.get('cityGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );


  }

  private _filterGroup(value: string): CityGroup[] {
    if (value) {
      return this.cityGroups
        .map(group => ({country: group.country, cities: _filter(group.cities, value)}))
        .filter(group => group.cities.length > 0);
    }

    return this.cityGroups;
  }



  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({...this.data, ...this.form.getRawValue()});
  }

  get name() {
    return this.form.get('name');
  }

  get officialRating() {
    return this.form.get('officialRating');
  }

}
