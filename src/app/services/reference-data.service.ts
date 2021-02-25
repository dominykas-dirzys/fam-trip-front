import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  private static readonly URL = '/api/reference_data';
  private cuisineTypes = [];
  private foodQualities = [];
  private hotelLabels = [];
  private hotelRatings = [];
  private recommendedTos = [];
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
                  this.cuisineTypes.push({...responseData[key]});
                  break;
                case 'foodQualities':
                  this.foodQualities.push({...responseData[key]});
                  break;
                case 'hotelLabels':
                  this.hotelLabels.push({...responseData[key]});
                  break;
                case 'hotelRatings':
                  this.hotelRatings.push({...responseData[key]});
                  console.log('findAll switch');
                  console.log('Hotel ratings:');
                  console.log(this.hotelRatings);
                  console.log('(length:) ');
                  console.log(this.hotelRatings?.length);
                  console.log('[2]: ');
                  console.log(this.hotelRatings[2]);
                  break;
                case 'recommendedTos':
                  this.recommendedTos.push({...responseData[key]});
                  break;
                case 'roomConditions':
                  this.roomConditions.push({...responseData[key]});
                  break;
                case 'roomTypes':
                  this.roomTypes.push({...responseData[key]});
                  break;
                case 'sizes':
                  this.sizes.push({...responseData[key]});
                  break;
              }
              referenceDataArray.push({...responseData[key], id: key});
            }
          }
          return referenceDataArray;
        })
      )
      .subscribe(referenceDataUnits => {
        console.log('referenceDataUnits: ');
        console.log(referenceDataUnits);
      });
  }

  public getHotelRatings() {
    console.log('getHotelRatings');
    console.log('Hotel ratings:');
    console.log(this.hotelRatings);
    console.log('(length:) ');
    console.log(this.hotelRatings?.length);
    console.log('[2]: ');
    console.log(this.hotelRatings[2]);
    return this.hotelRatings;
  }

}
