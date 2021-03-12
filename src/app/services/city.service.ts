import {Injectable} from '@angular/core';
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
    return this.api.get(CityService.URL) as Observable<City[]>;

  }

  post(data: object) {
    return this.api.post(CityService.URL, data);
  }
}
