import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TOKEN_KEY} from '../common/constants';
import {Observable} from 'rxjs';
import {City} from '../types/types';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private static readonly URL: '/api/cities';

  constructor(private api: ApiService) {
  }

  public findAll(): Observable<City[]> {
    return this.api.get<City[]>(CityService.URL);
  }
}
