import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingDetailComponent } from './editing-detail.component';

describe('EditingDetailComponent', () => {
  let component: EditingDetailComponent;
  let fixture: ComponentFixture<EditingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
