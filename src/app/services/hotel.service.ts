import {Injectable} from '@angular/core';
import {HotelListComponent} from "../components/hotel-list/hotel-list.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hotel} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelsUrl: string;
  private hotelList: HotelListComponent;

  constructor(private http: HttpClient) {
    this.hotelsUrl = 'http://localhost:8080/api/hotels';
  }

  public findAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelsUrl);
  }

  public save(hotel: Hotel) {
    return this.http.post<Hotel>(this.hotelsUrl, hotel);
  }

  public delete(hotel: Hotel) {
    return this.http.delete(this.hotelsUrl + '/' + hotel.id);
  }

}


