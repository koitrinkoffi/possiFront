import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDatatableComponent } from './person-datatable.component';

describe('PersonDatatableComponent', () => {
  let component: PersonDatatableComponent;
  let fixture: ComponentFixture<PersonDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
