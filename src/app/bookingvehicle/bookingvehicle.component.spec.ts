import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingvehicleComponent } from './bookingvehicle.component';

describe('BookingvehicleComponent', () => {
  let component: BookingvehicleComponent;
  let fixture: ComponentFixture<BookingvehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingvehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
