import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  private static readonly URL = '/api/reference_data';
  private cuisines = [];
  private foodQualities = [];
  private hotelLabels = [];
  private hotelRatings = [];
  private theRecommendedTos = [];
  private roomConditions = [];
  private roomTypes = [];
  private sizes = [];

  constructor(private api: ApiService) {
  }

  public findAll() {
    this.api.get(ReferenceDataService.URL)
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
          return referenceDataArray;
        })
      )
      .subscribe(referenceDataUnits => {
      });
  }

  public getCuisines() {
    return this.cuisines;
  }

  public getFoodQualities() {
    return this.foodQualities;
  }

  public getHotelLabels() {
    return this.hotelLabels;
  }

  public getHotelRatings() {
    return this.hotelRatings;
  }

  public getRecommendedTos() {
    return this.theRecommendedTos;
  }

  public getRoomConditions() {
    return this.roomConditions;
  }

  public getRoomTypes() {
    return this.roomTypes;
  }

  public getSizes() {
    return this.sizes;
  }

  public resetReferences() {
    this.cuisines = [];
    this.foodQualities = [];
    this.hotelLabels = [];
    this.hotelRatings = [];
    this.theRecommendedTos = [];
    this.roomConditions = [];
    this.roomTypes = [];
    this.sizes = [];
  }
}
