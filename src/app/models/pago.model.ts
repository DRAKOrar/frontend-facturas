import { Factura } from "./factura.model";

export interface Pago {
  id?: number;
  monto: number;
  fecha?: string;
  observacion: string;
  factura?: Factura;
}
