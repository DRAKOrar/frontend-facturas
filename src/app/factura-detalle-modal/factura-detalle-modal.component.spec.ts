import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDetalleModalComponent } from './factura-detalle-modal.component';

describe('FacturaDetalleModalComponent', () => {
  let component: FacturaDetalleModalComponent;
  let fixture: ComponentFixture<FacturaDetalleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaDetalleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
