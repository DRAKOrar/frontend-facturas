import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Factura } from '../models/factura.model';
import { EstadoFacturaTexto } from '../models/EstadoFacturaTexto.model';
import { EstadoFactura } from '../models/EstadoFactura.model';
@Component({
  selector: 'app-factura-detalle-modal',
  imports: [CommonModule],
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
}
