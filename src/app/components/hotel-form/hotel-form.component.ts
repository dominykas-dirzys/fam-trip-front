import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {City, CityGroup, Hotel} from '../../types/types';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CityService} from '../../services/city.service';
import {HttpClient} from '@angular/common/http';
import {TOKEN_KEY} from '../../common/constants';

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

  cities: City[] = [];
  cityTitles: string[] = [];

  cityGroups = [{
    country: 'Lithuania (hard-coded)',
    cities: [],
  }, {
    country: 'Turkey (hard-coded)',
    cities: [],
  }];

  referenceDataUrl: string;

  referenceData = [];
  cuisines = [];
  foodQualities = [];
  hotelLabels = [];
  hotelRatings = [];
  theRecommendedTos = [];
  roomConditions = [];
  roomTypes = [];
  sizes = [];

  cityGroupOptions: Observable<CityGroup[]>;
  currentCity = this.data.city;

  form: FormGroup = this._formBuilder.group({
    city: '',
  });

  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HotelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hotel,
    private cityService: CityService,
  ) {
    this.referenceDataUrl = 'http://localhost:8080/api/reference_data';
  }

  ngOnInit(): void {
    this.fetchCities();
    this.findAll();

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
    this.cityService.findAll().subscribe(data => {
      this.cities = data;
      this.cityGroups.forEach(group => group.cities = data);
      for (const element of this.cities) {
        this.cityTitles.push(element.title);
      }
    });
  }

  public findAll() {
    this.http.get(this.referenceDataUrl, this.getRequestOptions())
      .pipe(
        map(responseData => {
          const referenceDataArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              switch (key) {
                case 'cuisineTypes':
                  this.cuisines.push(...responseData[key]);
                  break;
                case 'foodQualities':
                  this.foodQualities.push(...responseData[key]);
                  break;
                case 'hotelLabels':
                  this.hotelLabels.push(...responseData[key]);
                  break;
                case 'hotelRatings':
                  this.hotelRatings.push(...responseData[key]);
                  break;
                case 'recommendedTos':
                  this.theRecommendedTos.push(...responseData[key]);
                  break;
                case 'roomConditions':
                  this.roomConditions.push(...responseData[key]);
                  break;
                case 'roomTypes':
                  this.roomTypes.push(...responseData[key]);
                  break;
                case 'sizes':
                  this.sizes.push(...responseData[key]);
                  break;
              }
              referenceDataArray.push({...responseData[key], id: key});
            }
          }
          this.referenceData = referenceDataArray;
        })
      )
      .subscribe();
  }

  private getRequestOptions() {
    const token = sessionStorage.getItem(TOKEN_KEY);

    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    };

    return {
      headers
    };
  }
}
