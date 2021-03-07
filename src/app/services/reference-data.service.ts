import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReferenceData} from "../types/types";
import {TOKEN_KEY} from "../common/constants";

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  // private referenceDataUrl: string;
  //
  // constructor(private http: HttpClient) {
  //   this.referenceDataUrl = 'http://localhost:8080/api/reference_data';
  // }
  //
  // public findAll(): Observable<ReferenceData[]> {
  //   return this.http.get<ReferenceData[]>(this.referenceDataUrl, this.getRequestOptions());
  // }
  //
  // private getRequestOptions() {
  //   const token = sessionStorage.getItem(TOKEN_KEY);
  //
  //   const headers: { [key: string]: string } = {
  //     'Content-Type': 'application/json',
  //     Authorization: token ? `Bearer ${token}` : ''
  //   };
  //
  //   return {
  //     headers
  //   };
  // }

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
        console.log('referenceDataUnits: ');
        console.log(referenceDataUnits);
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
    console.log('referenceDataService getSizes:');
    console.log(this.sizes);
    return this.sizes;
  }
}
