import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {Hotel} from '../../types/types';
import {HotelFormComponent} from '../hotel-form/hotel-form.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    this.api.delete(HotelListComponent.URL + '/' + id).subscribe(
      () => this.hotels = this.hotels.filter(item => item.id !== id)
    );
  }

  private load() {
    this.api.get(HotelListComponent.URL).subscribe((data: Hotel[]) => {
      this.hotels = data;
      this.dataSource = new MatTableDataSource(this.hotels);
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
    });
  }
}
