import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFacturaModalComponent } from './editar-factura-modal.component';

describe('EditarFacturaModalComponent', () => {
  let component: EditarFacturaModalComponent;
  let fixture: ComponentFixture<EditarFacturaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFacturaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFacturaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
