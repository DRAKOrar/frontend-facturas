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

  descargarReporteFacturasPorCliente(clienteId: number, nombreCliente: string): void {
  this.http.get(`http://localhost:8080/clientes/${clienteId}/reporte-facturas`, {
    responseType: 'blob'
  }).subscribe(blob => {
    const nombreLimpio = nombreCliente.replace(/[^a-zA-Z0-9]/g, "_");
    const nombreArchivo = `facturas_${nombreLimpio}.pdf`;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

validarCedula(cedula: string): Observable<boolean> {
  return this.http.get<boolean>(`http://localhost:8080/clientes/cedula-existe/${cedula}`);
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
