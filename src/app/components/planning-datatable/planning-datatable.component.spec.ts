import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDatatableComponent } from './planning-datatable.component';

describe('PlanningDatatableComponent', () => {
  let component: PlanningDatatableComponent;
  let fixture: ComponentFixture<PlanningDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
