import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingListComponent } from './editing-list.component';

describe('EditingListComponent', () => {
  let component: EditingListComponent;
  let fixture: ComponentFixture<EditingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
