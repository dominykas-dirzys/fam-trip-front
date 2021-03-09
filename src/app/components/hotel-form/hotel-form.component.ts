import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {City, CityGroup, Country, Hotel} from '../../types/types';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CityService} from '../../services/city.service';
import {ReferenceDataService} from '../../services/reference-data.service';
import {CountryService} from "../../services/country.service";

const _filter = (opt: City[], value: City | string): City[] => {
  const filterValue = typeof value === 'object' ? value.title.toLowerCase() : value.toLowerCase();

  return opt.filter(item => item.title.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  countries: Country[] = [];
  cities: City[] = [];
  cityTitles: string[] = [];

  cityGroups = [{
    country: 'Lithuania (hard-coded)',
    cities: [],
  }, {
    country: 'Turkey (hard-coded)',
    cities: [],
  }];

  cuisines = [];
  foodQualities = [];
  hotelLabels = [];
  hotelRatings = [];
  theRecommendedTos = [];
  roomConditions = [];
  sizes = [];

  cityGroupOptions: Observable<CityGroup[]>;
  currentCity = this.data.city;

  form: FormGroup = this._formBuilder.group({
    city: '',
  });

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HotelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hotel,
    private cityService: CityService,
    private countryService: CountryService,
    private referenceDataService: ReferenceDataService
  ) {
  }

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchCities();
    this.fetchReferenceData();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(2)
      ]),
      officialRating: new FormControl(this.data.officialRating, [
        Validators.required
      ]),
      city: new FormControl(this._formBuilder.group({
          city: this.data.city,
        })
      ),
      inspectionScore: new FormControl(this.data.inspectionScore, [
        Validators.required, Validators.min(1), Validators.max(10)
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

    this.cityGroupOptions = this.form.get('city')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

    this.form.patchValue(
      {
        city: this.currentCity,
      }
    );
  }

  displayFn(city: City): string {
    return city ? city?.title : '';
  }

  get name() {
    return this.form.get('name');
  }

  get officialRating() {
    return this.form.get('officialRating');
  }

  get foodQuality() {
    return this.form.get('foodQuality');
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

  get waterSlides() {
    return this.form.get('waterSlides');
  }

  get spa() {
    return this.form.get('spa');
  }

  get recommendedTos() {
    return this.form.get('recommendedTos');
  }

  get labels() {
    return this.form.get('labels');
  }

  get cuisineTypes() {
    return this.form.get('cuisineTypes');
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
    this.cityService.findAll().subscribe((
      data: City[]) => {
      this.cities = data;
      console.log('this.cities from hotel-form fetchCities():');
      console.log(this.cities);
      this.cityGroups.forEach(group => group.cities = this.cities);
      for (const element of this.cities) {
        this.cityTitles.push(element.title);
      }
    });
  }

  fetchCountries() {
    this.countryService.findAll().subscribe((
      data: Country[]) => {
        this.countries = data;
        console.log('this.countries from hotel-form fetchCountries():');
        console.log(this.countries);
      }
    );
  }

  public fetchReferenceData() {
    this.referenceDataService.findAll();
    this.cuisines = this.referenceDataService.getCuisines();
    this.foodQualities = this.referenceDataService.getFoodQualities();
    this.hotelLabels = this.referenceDataService.getHotelLabels();
    this.hotelRatings = this.referenceDataService.getHotelRatings();
    this.theRecommendedTos = this.referenceDataService.getRecommendedTos();
    this.sizes = this.referenceDataService.getSizes();
  }
}
