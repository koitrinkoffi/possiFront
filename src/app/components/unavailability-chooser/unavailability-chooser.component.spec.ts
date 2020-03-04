import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailabilityChooserComponent } from './unavailability-chooser.component';

describe('UnavailabilityChooserComponent', () => {
  let component: UnavailabilityChooserComponent;
  let fixture: ComponentFixture<UnavailabilityChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnavailabilityChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailabilityChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
