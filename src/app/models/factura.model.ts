import { Cliente } from "./cliente.model";
import { Producto } from "./producto.model";

export interface Factura {
  id?: number;
  fechaCreacion?: string; // ISO date string
  fechaActualizacion?: string; // ISO date string
  estado?: 'ACTIVA' | 'INACTIVA';
  productos: Producto[];
  total?: number;
  cliente?: Cliente;
}
