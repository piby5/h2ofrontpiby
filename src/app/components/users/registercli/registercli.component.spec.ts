import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercliComponent } from './registercli.component';

describe('RegistercliComponent', () => {
  let component: RegistercliComponent;
  let fixture: ComponentFixture<RegistercliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistercliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistercliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
