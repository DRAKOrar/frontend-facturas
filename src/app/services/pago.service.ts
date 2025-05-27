import { Injectable } from '@angular/core';
import { Pago } from '../models/pago.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'https://fiados-api.onrender.com/pagos';

  constructor(private http: HttpClient) {}

  obtenerPagosPorFactura(facturaId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/factura/${facturaId}`);
  }

  registrarPago(facturaId: number, pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${this.apiUrl}/factura/${facturaId}`, pago);
  }

  eliminarPago(pagoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pagoId}`);
  }
}
