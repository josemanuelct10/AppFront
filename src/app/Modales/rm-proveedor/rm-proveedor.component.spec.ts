import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmProveedorComponent } from './rm-proveedor.component';

describe('RmProveedorComponent', () => {
  let component: RmProveedorComponent;
  let fixture: ComponentFixture<RmProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RmProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RmProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
