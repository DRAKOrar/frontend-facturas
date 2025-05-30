import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../models/factura.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private apiUrl = 'http://localhost:8080/facturas';

  constructor(private http: HttpClient) {}

  // 🔹 Crear factura para un cliente
  crearFactura(clienteId: number, factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.apiUrl}/${clienteId}`, factura);
  }

  // 🔹 Obtener factura por ID
  obtenerFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Actualizar factura (productos, estado)
  actualizarFactura(id: number, factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/${id}`, factura);
  }

  // 🔹 Eliminar factura (solo si está inactiva)
  eliminarFactura(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  obtenerFacturasPorCliente(clienteId: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  // Obtener facturas recientes
obtenerFacturasRecientes(): Observable<Factura[]> {
  return this.http.get<Factura[]>(`${this.apiUrl}/recientes`);
}

// Obtener facturas activas de un cliente
obtenerActivasPorCliente(clienteId: number): Observable<Factura[]> {
  return this.http.get<Factura[]>(`${this.apiUrl}/cliente/${clienteId}/activas`);
}

listarTodas(): Observable<Factura[]> {
  return this.http.get<Factura[]>(`${this.apiUrl}`);
}

descargarReporteFactura(id: number): void {
    this.http.get(`${this.apiUrl}/${id}/reporte`, { responseType: 'blob' }).subscribe(blob => {
      this.descargarArchivo(blob, `daniel_careverga${id}.pdf`);
    });
  }

  descargarReporteTodas(): void {
    this.http.get(`${this.apiUrl}/reporte`, { responseType: 'blob' }).subscribe(blob => {
      this.descargarArchivo(blob, `reporte_facturas.pdf`);
    });
  }

  private descargarArchivo(blob: Blob, nombre: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
  }



}
