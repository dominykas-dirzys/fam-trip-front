import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {City, CityGroup, Country, Hotel} from '../../types/types';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CityService} from '../../services/city.service';
import {ReferenceDataService} from '../../services/reference-data.service';
import {CountryService} from '../../services/country.service';
import {RequireMatch} from '../../common/requireMatch';
import {CityFormComponent} from '../city-form/city-form.component';
import {ApiService} from "../../services/api.service";

const _filter = (opt: City[], value: City | string): City[] => {
  const filterValue = typeof value === 'object' ? value.title.toLowerCase() : value.toLowerCase();

  return opt.filter(item => item.title.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit, OnDestroy {

  private static readonly URL = '/api/hotels';

  countries: Country[] = [];
  cities: City[] = [];
  cityGroups = [];

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
    private referenceDataService: ReferenceDataService,
    public dialog: MatDialog,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.fetchCityGroups();
    this.fetchReferenceData();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      officialRating: new FormControl(this.data.officialRating, [
        Validators.required
      ]),
      city: new FormControl(this._formBuilder.group({
          city: this.data.city,
        }), [
          Validators.required,
          RequireMatch
        ]
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
      recommendedTos: new FormControl(this.data.recommendedTos),
      labels: new FormControl(this.data.labels),
      cuisineTypes: new FormControl(this.data.cuisineTypes)
    });

    this.cityGroupOptions = this.form.get('city')!.valueChanges
      .pipe(
        startWith(this.data.city),
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

    this.api.post(HotelFormComponent.URL, {...this.data, ...this.form.getRawValue()}).subscribe(
      (result: Hotel) => this.dialogRef.close(result),
      err => this.api.setValidationResult(err, this.form)
    );
  }

  fetchCityGroups() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.countryService.findAll().subscribe((
      data: Country[]) => {
        this.countries = data;
        this.fetchCities();
      }
    );
  }

  fetchCities() {
    this.cityService.findAll().subscribe((
      data: City[]) => {
      this.cities = data;
      this.cities = this.cities.sort((a, b) => a.title.localeCompare(b.title));
      this.groupCities();
    });
  }

  groupCities() {
    for (const city of this.cities) {
      const citysCountryTitle = city.country.title;
      let foundCountry = false;

      for (const cityGroup of this.cityGroups) {
        if (cityGroup.country === citysCountryTitle) {
          foundCountry = true;
          cityGroup.cities.push(city);
        }
      }
      if (!foundCountry) {
        const cityArray = [];
        cityArray.push(city);
        this.cityGroups.push({country: citysCountryTitle, cities: cityArray});
      }
    }
    this.cityGroups = this.cityGroups.sort((a, b) => a.country.localeCompare(b.country));
  }

  fetchReferenceData() {
    this.referenceDataService.findAll();
    this.cuisines = this.referenceDataService.getCuisines();
    this.foodQualities = this.referenceDataService.getFoodQualities();
    this.hotelLabels = this.referenceDataService.getHotelLabels();
    this.hotelRatings = this.referenceDataService.getHotelRatings();
    this.theRecommendedTos = this.referenceDataService.getRecommendedTos();
    this.sizes = this.referenceDataService.getSizes();
  }

  ngOnDestroy() {
    this.referenceDataService.resetReferences();
  }

  openDialog(city?: City) {
    const dialogRef = this.dialog.open(CityFormComponent, {
      width: '100%',
      data: city || {}
    });

    dialogRef.afterClosed().subscribe((data: City) => {
      if (data && data.id) {
        this.cityService.post(data).subscribe(
          (result: City) => this.cities = this.cities.map(c => c.id === result.id ? result : c)
        );
      } else if (data) {
        this.cityService.post(data).subscribe(
          (result: City) => this.cities = [...this.cities, result]
        );
      }
      this.cityGroups = [];
      this.fetchCities();
    });
  }
}
