import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  // 🔹 Listar todos los clientes
  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  descargarReporteFacturasPorCliente(clienteId: number): void {
    this.http.get(`http://localhost:8080/clientes/${clienteId}/reporte-facturas`, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facturas_cliente_${clienteId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }




  // 🔹 Obtener cliente por ID
  obtenerCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Crear cliente
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // 🔹 Actualizar cliente
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  // 🔹 Eliminar cliente
  eliminarCliente(id: number): Observable<any> {
    // ResponseType 'text' para manejar errores de tipo 409 como texto
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // Clientes con deuda (facturas activas)
  obtenerClientesConDeuda(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/con-deuda`);
  }

}
