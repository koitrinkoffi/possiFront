import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePlanningComponent } from './private-planning.component';

describe('PrivatePlanningComponent', () => {
  let component: PrivatePlanningComponent;
  let fixture: ComponentFixture<PrivatePlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatePlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
