import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Country} from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private static readonly URL = '/api/countries';

  constructor(private api: ApiService) {
  }

  public findAll(): Observable<Country[]> {
    return this.api.get(CountryService.URL) as Observable<Country[]>;
  }
}
