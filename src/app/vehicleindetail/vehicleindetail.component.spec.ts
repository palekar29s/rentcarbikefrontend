import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleindetailComponent } from './vehicleindetail.component';

describe('VehicleindetailComponent', () => {
  let component: VehicleindetailComponent;
  let fixture: ComponentFixture<VehicleindetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleindetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
