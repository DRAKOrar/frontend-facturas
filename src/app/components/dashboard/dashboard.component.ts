import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface TopCliente {
  nombreCliente: string;
  totalFacturado: number;
}

interface DashboardStats {
  totalClientes: number;
  totalFacturas: number;
  totalFacturado: number;
  facturasActivas: number;
  facturasInactivas: number;
  topClientes: TopCliente[];
}
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats!: DashboardStats;
  porcentajeActivas = 0;
  porcentajeInactivas = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<DashboardStats>('http://localhost:8080/dashboard/estadisticas')
      .subscribe(data => {
        this.stats = data;

        if (data.totalFacturas > 0) {
          this.porcentajeActivas = (data.facturasActivas / data.totalFacturas) * 100;
          this.porcentajeInactivas = (data.facturasInactivas / data.totalFacturas) * 100;
        }
      });
  }
}
