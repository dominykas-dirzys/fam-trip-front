import {Injectable} from '@angular/core';
import {TOKEN_KEY} from '../common/constants';
import {Observable} from 'rxjs';
import {City} from '../types/types';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private static readonly URL = '/api/cities';

  constructor(private api: ApiService) {
  }

  public findAll(): Observable<City[]> {
    this.api.get<City[]>(CityService.URL);
  }

  // public findAll(): Observable<City[]> {
  //   return this.http.get<City[]>(this.citiesUrl, this.getRequestOptions());
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
}
