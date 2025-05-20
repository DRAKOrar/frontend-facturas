import { Component, OnInit } from '@angular/core';
import { Factura } from '../../../models/factura.model';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../../services/factura.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarFacturaModalComponent } from '../../../editar-factura-modal/editar-factura-modal.component';
import { FacturaDetalleModalComponent } from '../../../factura-detalle-modal/factura-detalle-modal.component';

@Component({
  selector: 'app-factura-detalle',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,EditarFacturaModalComponent,FacturaDetalleModalComponent],
  templateUrl: './factura-detalle.component.html',
  styleUrl: './factura-detalle.component.scss'
})
export class FacturaDetalleComponent implements OnInit {
  facturas: Factura[] = [];
  facturasFiltradas: Factura[] = [];
  filtro: string = '';
  cargando = false;
  errorMessage: string | null = null;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    this.cargando = true;
    this.facturaService.listarTodas().subscribe({
      next: (data) => {
        this.facturas = data;
        this.facturasFiltradas = data;
        this.cargando = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las facturas.';
        this.cargando = false;
      }
    });
  }

  filtrar(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.facturasFiltradas = this.facturas.filter(f =>
      f.cliente?.nombre?.toLowerCase().includes(filtroLower) ||
      f.cliente?.cedula?.includes(this.filtro) ||
      f.cliente?.id?.toString().includes(this.filtro)
    );
  }

  verDetalles(factura: Factura): void {
    console.log('Detalles:', factura); // Aquí puedes abrir un modal luego
  }

  editarFactura(factura: Factura): void {
    console.log('Editar:', factura); // Aquí luego invocas el modal
  }

  eliminarFactura(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta factura?')) return;
    this.facturaService.eliminarFactura(id).subscribe({
      next: () => this.cargarFacturas(),
      error: () => alert('No se pudo eliminar la factura')
    });
  }

  modalEditarVisible = false;
facturaSeleccionada!: Factura;

abrirModalEditar(factura: Factura): void {
  this.facturaSeleccionada = factura;
  this.modalEditarVisible = true;
}

cerrarModalEditar(): void {
  this.modalEditarVisible = false;
  this.facturaSeleccionada = {} as Factura;
}

refrescarFacturas(): void {
  this.cargarFacturas();
}
descargarPDF(id: number): void {
  this.facturaService.descargarReporteFactura(id);
}


modalDetalleVisible = false;
facturaParaVer!: Factura;

abrirModalDetalle(factura: Factura): void {
  this.facturaService.obtenerFactura(factura.id!).subscribe({
    next: (facturaCompleta) => {
      console.log('Factura con cliente completo:', facturaCompleta);
      this.facturaParaVer = facturaCompleta;
      this.modalDetalleVisible = true;
    },
    error: () => {
      alert('No se pudo obtener el detalle de la factura.');
    }
  });
}


cerrarModalDetalle(): void {
  this.modalDetalleVisible = false;
  this.facturaParaVer = {} as Factura;
}


}
