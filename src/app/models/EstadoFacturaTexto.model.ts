import { EstadoFactura } from "./EstadoFactura.model";

export const EstadoFacturaTexto: Record<EstadoFactura, string> = {
  [EstadoFactura.ACTIVA]: 'ACTIVA',
  [EstadoFactura.INACTIVA]: 'CANCELADA'
};
