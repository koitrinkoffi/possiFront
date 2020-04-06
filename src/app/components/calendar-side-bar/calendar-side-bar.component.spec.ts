import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSideBarComponent } from './calendar-side-bar.component';

describe('CalendarSideBarComponent', () => {
  let component: CalendarSideBarComponent;
  let fixture: ComponentFixture<CalendarSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
