import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {City, Hotel, CityGroup, ReferenceData} from '../../types/types';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {CityService} from '../../services/city.service';
import {ApiService} from '../../services/api.service';
import {ReferenceDataService} from "../../services/reference-data.service";

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

  constructor(
    // private api: ApiService,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HotelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hotel,
    private cityService: CityService,
    private referenceDataService: ReferenceDataService
  ) {
  }

  get name() {
    return this.form.get('name');
  }

  get officialRating() {
    return this.form.get('officialRating');
  }

  get city() {
    return this.form.get('city.title');
  }

  get inspectionScore() {
    return this.form.get('inspectionScore');
  }

  get territorySize() {
    return this.form.get('territorySize');
  }

  // private static readonly URL = '/api/reference_data';

  form: FormGroup = this._formBuilder.group({
    cityGroup: '',
  });

  cities: City[];
  cityTitles: string[] = [];
  referenceData = this.referenceDataService.findAll();
  hotelRatings = this.referenceDataService.getHotelRatings();

  cityGroups = [{
    country: 'Lithuania (hard-coded)',
    cities: this.cityTitles
  }, {
    country: 'Turkey (hard-coded)',
    cities: ['Bodrum (hard-coded)', 'Kemer (hard-coded)']
  }];

  cityGroupOptions: Observable<CityGroup[]>;
  currentCity = this.data.city.title;

  ngOnInit(): void {
    this.fetchCities();

    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(2)
      ]),
      officialRating: new FormControl(this.data.officialRating, [
        Validators.required
      ]),
      cityGroup: new FormControl(this._formBuilder.group({
          cityGroup: ''
        })
      ),
      inspectionScore: new FormControl(this.data.inspectionScore, [
        Validators.required
      ]),
      foodQuality: new FormControl(this.data.foodQuality),
      territorySize: new FormControl(this.data.territorySize),
      waterSlides: new FormControl(this.data.waterSlides),
      spa: new FormControl(this.data.spa),
      distanceToBeach: new FormControl(this.data.distanceToBeach),
      distanceFromAirport: new FormControl(this.data.distanceFromAirport),
      remarks: new FormControl(this.data.remarks),
      author: new FormControl(this.data.author.id),
      recommendedTos: new FormControl(this.data.recommendedTos),
      rooms: new FormControl(this.data.rooms),
      labels: new FormControl(this.data.labels),
      cuisineTypes: new FormControl(this.data.cuisineTypes)
    });

    this.cityGroupOptions = this.form.get('cityGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

    this.form.patchValue(
      {
        cityGroup: this.currentCity,
      }
    );

    console.log('Reference data in hotel-form received from service:');
    console.log(this.referenceData);
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
    console.log('Save method run');
    console.log(this.form.getRawValue());
    this.dialogRef.close({...this.data, ...this.form.getRawValue()});
  }

  fetchCities() {
    this.cityService.findAll().subscribe(data => {
      this.cities = data;
      for (const element of this.cities) {
        this.cityTitles.push(element.title);
      }
    });
  }

  // private fetchReferenceData() {
  //   this.api.get(HotelFormComponent.URL)
  //     .pipe(
  //       map(responseData => {
  //         const referenceDataArray = [];
  //         for (const key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             referenceDataArray.push({...responseData[key], id: key});
  //           }
  //         }
  //         return referenceDataArray;
  //       })
  //     )
  //     .subscribe(referenceDataUnits => {
  //       console.log('referenceDataUnits: ');
  //       console.log(referenceDataUnits);
  //     });
  //
  // }
}
