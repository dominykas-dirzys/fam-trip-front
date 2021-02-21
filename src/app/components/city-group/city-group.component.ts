import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface CityGroup {
  country: string;
  cities: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-city-group',
  templateUrl: './city-group.component.html',
  styleUrls: ['./city-group.component.css']
})

export class CityGroupComponent implements OnInit {

  cityForm: FormGroup = this._formBuilder.group({
    cityGroup: '',
  });

  cityGroups: CityGroup[] = [{
    country: 'Lithuania',
    cities: ['Kaunas', 'Klaipeda', 'Palanga', 'Vilnius']
  }, {
    country: 'Turkey',
    cities: ['Bodrum', 'Kemer']
  }];

  cityGroupOptions: Observable<CityGroup[]>;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.cityGroupOptions = this.cityForm.get('cityGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): CityGroup[] {
    if (value) {
      return this.cityGroups
        .map(group => ({country: group.country, cities: _filter(group.cities, value)}))
        .filter(group => group.cities.length > 0);
    }

    return this.cityGroups;
  }
}
