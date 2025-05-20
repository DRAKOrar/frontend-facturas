import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators} from '@angular/forms';
import { Factura } from '../models/factura.model';
import { FacturaService } from '../services/factura.service';
import { EstadoFactura } from '../models/EstadoFactura.model';
import { EstadoFacturaTexto } from '../models/EstadoFacturaTexto.model';
@Component({
  selector: 'app-editar-factura-modal',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './editar-factura-modal.component.html',
  styleUrl: './editar-factura-modal.component.scss'
})
export class EditarFacturaModalComponent {
 @Input() factura!: Factura;
  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizada = new EventEmitter<Factura>();

  form!: FormGroup;
  estados = Object.values(EstadoFactura);
  estadoTexto = EstadoFacturaTexto;

  constructor(private fb: FormBuilder, private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      estado: [this.factura.estado, Validators.required],
      productos: this.fb.array(
        this.factura.productos.map(p => this.fb.group({
          nombre: [p.nombre, Validators.required],
          cantidad: [p.cantidad, [Validators.required, Validators.min(1)]],
          precioUnitario: [p.precioUnitario, [Validators.required, Validators.min(0)]],
        }))
      )
    });
  }

  get productos() {
    return this.form.get('productos') as FormArray;
  }

  agregarProducto(): void {
    this.productos.push(this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  eliminarProducto(i: number): void {
    this.productos.removeAt(i);
  }

  calcularTotal(): number {
    return this.productos.value.reduce(
      (total: number, p: any) => total + (p.cantidad * p.precioUnitario), 0
    );
  }

  guardar(): void {
    if (this.form.invalid) return;

    const datos = this.form.value;
    const facturaActualizada: Factura = {
      ...this.factura,
      estado: datos.estado,
      productos: datos.productos,
      total: this.calcularTotal(),
    };

    this.facturaService.actualizarFactura(facturaActualizada.id!, facturaActualizada).subscribe({
      next: resp => {
        this.actualizada.emit(resp);
        this.cerrar.emit();
      },
      error: () => alert('Error al actualizar la factura')
    });
  }

  cerrarConAnimacion(): void {
    const modal = document.querySelector('.modal-dialog') as HTMLElement;
    if (modal) {
      modal.classList.add('modal-close-animation');
      setTimeout(() => this.cerrar.emit(), 300);
    } else {
      this.cerrar.emit();
    }
  }
}
