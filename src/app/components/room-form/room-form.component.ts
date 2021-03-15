import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../types/types';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReferenceDataService} from '../../services/reference-data.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit, OnDestroy {

  roomConditions = [];
  roomTypes = [];
  sizes = [];

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RoomFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room,
    private referenceDataService: ReferenceDataService
  ) {
  }

  ngOnInit() {
    this.fetchReferenceData();

    this.form = new FormGroup({
      roomType: new FormControl(this.data.roomType, Validators.required),
      type: new FormControl(this.data.type, Validators.maxLength(50)),
      size: new FormControl(this.data.size),
      roomCondition: new FormControl(this.data.roomCondition),
      remarks: new FormControl(this.data.remarks)
    });
  }

  public fetchReferenceData() {
    this.referenceDataService.findAll();
    this.roomConditions = this.referenceDataService.getRoomConditions();
    this.roomTypes = this.referenceDataService.getRoomTypes();
    this.sizes = this.referenceDataService.getSizes();
  }

  get size() {
    return this.form.get('size');
  }

  get roomType() {
    return this.form.get('roomType');
  }

  get type() {
    return this.form.get('type');
  }

  get roomCondition() {
    return this.form.get('roomCondition');
  }

  get remarks() {
    return this.form.get('remarks');
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    const roomType = this.form.get('roomType');
    if (roomType.value !== 'CUSTOM') {
      this.form.patchValue({
        ['type']: null
      });
    }
    this.dialogRef.close({...this.data, ...this.form.getRawValue()});
  }

  ngOnDestroy() {
    this.referenceDataService.resetReferences();
  }
}
