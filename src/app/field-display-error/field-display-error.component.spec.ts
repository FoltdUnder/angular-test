import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDisplayErrorComponent } from './field-display-error.component';

describe('FieldDisplayErrorComponent', () => {
  let component: FieldDisplayErrorComponent;
  let fixture: ComponentFixture<FieldDisplayErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldDisplayErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDisplayErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
