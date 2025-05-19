
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent {

  cargando = false;
  clientes: Cliente[] = [];
  errorMessage: string | null = null;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
  this.cargando = true;
  this.clienteService.listarClientes().subscribe({
    next: data => {
      this.clientes = data;
      this.cargando = false;
    },
    error: () => {
      this.errorMessage = 'No se pudo cargar la lista de clientes.';
      this.cargando = false;
    }
  });
}

ordenarPorNombre(): void {
  this.clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
}


  eliminarCliente(id: number): void {
  if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;

  this.errorMessage = null;
  this.clienteService.eliminarCliente(id).subscribe({
    next: () => this.cargarClientes(),
    error: err => {
      this.errorMessage = err.status === 409
        ? 'No se puede eliminar el cliente porque tiene facturas activas.'
        : 'Error al eliminar el cliente.';
    }
  });
}

ordenActual: 'nombre' | 'id' = 'nombre';
ascendente = true;

ordenar(campo: 'nombre' | 'id'): void {
  if (this.ordenActual === campo) {
    this.ascendente = !this.ascendente; // Cambia el orden
  } else {
    this.ordenActual = campo;
    this.ascendente = true; // Reinicia en ascendente
  }

  this.clientes.sort((a: any, b: any) => {
    const valA = a[campo];
    const valB = b[campo];
    return this.ascendente
      ? valA.localeCompare ? valA.localeCompare(valB) : valA - valB
      : valB.localeCompare ? valB.localeCompare(valA) : valB - valA;
  });
}

getIconoOrden(campo: 'nombre' | 'id'): string {
  if (this.ordenActual !== campo) return 'fa-sort';
  return this.ascendente ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up';
}


  irAgregarCliente(): void {
    this.router.navigate(['/crear-cliente']);
  }

  irEditarCliente(cliente: Cliente): void {
    this.router.navigate([`/editar-cliente/${cliente.id}`]);
  }

  irRegistrarFactura(cliente: Cliente): void {
    this.router.navigate([`/clientes/${cliente.id}/facturas/nueva`]);
  }


}
