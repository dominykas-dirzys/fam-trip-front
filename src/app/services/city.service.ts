import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TOKEN_KEY} from "../common/constants";
import {Observable} from "rxjs";
import {City} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private citiesUrl: string;

  constructor(private http: HttpClient) {
    this.citiesUrl = 'http://localhost:8080/api/cities';
  }

  public findAll(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesUrl, this.getRequestOptions());
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
