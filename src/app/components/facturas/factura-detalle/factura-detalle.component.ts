import { Component, OnInit } from '@angular/core';
import { Factura } from '../../../models/factura.model';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../../services/factura.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-factura-detalle',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './factura-detalle.component.html',
  styleUrl: './factura-detalle.component.scss'
})
export class FacturaDetalleComponent  {
  clienteIdControl = new FormControl<number | null>(null);
  facturas: Factura[] = [];
  errorMessage = '';
  loading = false;

  constructor(private facturaService: FacturaService) {}

  buscarFacturas() {
    this.errorMessage = '';
    this.facturas = [];

    const clienteId = this.clienteIdControl.value;
    if (!clienteId) {
      this.errorMessage = 'Debe ingresar un ID válido.';
      return;
    }

    this.loading = true;
    this.facturaService.obtenerFacturasPorCliente(clienteId).subscribe({
      next: (res) => {
        this.facturas = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las facturas del cliente.';
        this.loading = false;
      }
    });
  }
}
