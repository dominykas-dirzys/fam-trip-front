import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {City, Hotel} from "../../types/types";

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  form: FormGroup;
  cities: City[] = [];

  constructor(
    private dialogRef: MatDialogRef<HotelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hotel
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(2)
      ]),
      officialRating: new FormControl(this.data.officialRating, [
        Validators.required
      ]),
      city: new FormControl(this.data.city, [
        // Validators.required
      ])
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({...this.data, ...this.form.getRawValue()});
  }

  get name() {
    return this.form.get('name');
  }

  // get city() {
  //   return this.form.get('city');
  // }

  get officialRating() {
    return this.form.get('officialRating');
  }

}
