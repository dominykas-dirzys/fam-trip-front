import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {Hotel} from '../../types/types';
import {HotelFormComponent} from '../hotel-form/hotel-form.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit, AfterViewInit {

  private static readonly URL = '/api/hotels';

  displayedColumns: string[] = ['position', 'name', 'city', 'officialRating', 'inspectionScore', 'labels', 'actions'];

  hotels: Hotel[] = [];

  dataSource: MatTableDataSource<Hotel>;

  nameFilter = new FormControl('');
  cityFilter = new FormControl('');
  insScoreFilter = new FormControl('');
  labelsFilter = new FormControl('');
  filterValues = {
    name: '',
    inspectionScore: '',
    city: '',
    labels: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.hotels);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.load();
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.cityFilter.valueChanges
      .subscribe(
        city => {
          this.filterValues.city = city;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.insScoreFilter.valueChanges
      .subscribe(
        inspectionScore => {
          this.filterValues.inspectionScore = inspectionScore;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.labelsFilter.valueChanges
      .subscribe(
        labels => {
          this.filterValues.labels = labels;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.city.title.toString().toLowerCase().indexOf(searchTerms.city) !== -1
        && data.inspectionScore.toString().toLowerCase().indexOf(searchTerms.inspectionScore) !== -1
        && data.labels.toString().toLowerCase().indexOf(searchTerms.labels) !== -1;
    };
    return filterFunction;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private load() {
    this.api.get(HotelListComponent.URL).subscribe((data: Hotel[]) => {
      this.hotels = data;
      this.dataSource.data = this.hotels;
    });
  }

  openDialog(hotel?: Hotel) {
    const dialogRef = this.dialog.open(HotelFormComponent, {
      width: '100%',
      data: hotel || {}
    });

    dialogRef.afterClosed().subscribe((data: Hotel) => {
      if (!data) {
        return;
      }

      const index = this.hotels.findIndex(h => h.id === data.id);
      if (index < 0) {
        this.hotels = [...this.hotels, data];
      } else {
        this.hotels = this.hotels.map(h => h.id === data.id ? data : h);
      }

      this.load();
    });
  }
}
