import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityGroupComponent } from './city-group.component';

describe('CityGroupComponent', () => {
  let component: CityGroupComponent;
  let fixture: ComponentFixture<CityGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
