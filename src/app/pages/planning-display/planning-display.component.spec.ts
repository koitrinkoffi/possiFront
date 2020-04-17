import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDisplayComponent } from './planning-display.component';

describe('PlanningDisplayComponent', () => {
  let component: PlanningDisplayComponent;
  let fixture: ComponentFixture<PlanningDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
