import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import { FacturaFormComponent } from './components/facturas/factura-form/factura-form.component';
import { FacturaDetalleComponent } from './components/facturas/factura-detalle/factura-detalle.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'list', component: ClienteListComponent },
  { path: 'crear-cliente', component: ClienteFormComponent },
  { path: 'listar-facturas', component: FacturaDetalleComponent },
  { path: 'crear-factura', component: FacturaFormComponent },
  { path: 'dash', component: DashboardComponent},
  { path: '**', redirectTo: 'list' }
];
