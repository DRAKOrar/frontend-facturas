import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Factura } from '../models/factura.model';
import { EstadoFacturaTexto } from '../models/EstadoFacturaTexto.model';
import { EstadoFactura } from '../models/EstadoFactura.model';
import { PagoService } from '../services/pago.service';
import { Pago } from '../models/pago.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-factura-detalle-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './factura-detalle-modal.component.html',
  styleUrl: './factura-detalle-modal.component.scss'
})
export class FacturaDetalleModalComponent {
  @Input() factura!: Factura;
  @Output() cerrar = new EventEmitter<void>();

  estadoTexto = EstadoFacturaTexto;

  obtenerTextoEstado(estado: string | undefined): string {
  return this.estadoTexto[estado as EstadoFactura] ?? estado ?? 'Desconocido';
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

  calcularSubtotal(): number {
    return this.factura.productos.reduce((acc, p) => acc + p.cantidad * p.precioUnitario, 0);
  }

  pagos: Pago[] = [];
  nuevoPago: Pago = { monto: 0, observacion: '' };

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    if (!this.factura.id) return;
    this.pagoService.obtenerPagosPorFactura(this.factura.id).subscribe({
      next: pagos => this.pagos = pagos,
      error: () => console.warn('No se pudieron cargar los pagos.')
    });
  }

  registrarPago(): void {
  if (!this.factura.id || this.nuevoPago.monto <= 0) return;

  this.pagoService.registrarPago(this.factura.id, this.nuevoPago).subscribe({
    next: pago => {
      console.log('Pago registrado con éxito:', pago);
      this.pagos.push(pago);
      this.nuevoPago = { monto: 0, observacion: '' };
    },
    error: err => {
      console.error('Error al registrar el pago:', err);
       // ⬅️ captura real del error
      alert('No se pudo registrar el pago.');
    }
  });
}


  eliminarPago(id: number): void {
    if (!confirm('¿Eliminar este abono?')) return;

    this.pagoService.eliminarPago(id).subscribe({
      next: () => this.pagos = this.pagos.filter(p => p.id !== id),
      error: () => alert('No se pudo eliminar el pago.')
    });
  }
}
