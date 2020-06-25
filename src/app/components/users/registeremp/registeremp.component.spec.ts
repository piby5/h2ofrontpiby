import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterempComponent } from './registeremp.component';

describe('RegisterempComponent', () => {
  let component: RegisterempComponent;
  let fixture: ComponentFixture<RegisterempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
