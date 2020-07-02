import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasEmpComponent } from './ventas-emp.component';

describe('VentasEmpComponent', () => {
  let component: VentasEmpComponent;
  let fixture: ComponentFixture<VentasEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
