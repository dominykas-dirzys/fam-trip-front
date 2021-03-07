import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../types/types';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TOKEN_KEY} from '../../common/constants';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  referenceDataUrl: string;

  referenceData = [];
  cuisines = [];
  foodQualities = [];
  hotelLabels = [];
  hotelRatings = [];
  theRecommendedTos = [];
  roomConditions = [];
  roomTypes = [];
  sizes = [];

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RoomEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room
  ) {
    this.referenceDataUrl = 'http://localhost:8080/api/reference_data';
  }

  ngOnInit() {
    this.findAll();

    this.form = new FormGroup({
      roomType: new FormControl(this.data.roomType, Validators.required),
      size: new FormControl(this.data.size),
      roomCondition: new FormControl(this.data.roomCondition),
      remarks: new FormControl(this.data.remarks)
    });

  }



  get size() {
    return this.form.get('size');
  }

  get roomType() {
    return this.form.get('roomType');
  }

  get roomCondition() {
    return this.form.get('roomCondition');
  }

  get remarks() {
    return this.form.get('remarks');
  }

  public findAll() {
    this.http.get(this.referenceDataUrl, this.getRequestOptions())
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
          this.referenceData = referenceDataArray;
        })
      )
      .subscribe();
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    console.log('Save method run');
    console.log(this.form.getRawValue());
    this.dialogRef.close({...this.data, ...this.form.getRawValue()});
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
