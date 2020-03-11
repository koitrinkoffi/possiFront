import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantDatatableComponent } from './participant-datatable.component';

describe('ParticipantDatatableComponent', () => {
  let component: ParticipantDatatableComponent;
  let fixture: ComponentFixture<ParticipantDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
