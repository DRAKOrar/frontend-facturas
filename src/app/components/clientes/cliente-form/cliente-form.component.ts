import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Cliente } from '../../../models/cliente.model';
@Component({
  selector: 'app-cliente-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent {
  nuevoCliente: Cliente = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    cedula: ''
  };



  successMessage = '';
  errorMessage = '';

  constructor(private clienteService: ClienteService) {}

  agregarCliente() {
    
    this.successMessage = '';
    this.errorMessage = '';

    // Validación básica
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.telefono || !this.nuevoCliente.correo || !this.nuevoCliente.direccion) {
      this.errorMessage = 'Todos los campos excepto la cédula son obligatorios.';
      return;
    }

    // Validación de correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.nuevoCliente.correo)) {
      this.errorMessage = 'El correo electrónico no es válido.';
      return;
    }

    this.clienteService.crearCliente(this.nuevoCliente).subscribe({
      next: () => {
        this.successMessage = 'Cliente creado exitosamente.';
        this.nuevoCliente = {
          nombre: '',
          telefono: '',
          correo: '',
          direccion: '',
          cedula: ''
        };
      },
      error: (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessage = Object.values(error.error).join(' ');
        } else {
          this.errorMessage = 'Error al crear el cliente. Intente de nuevo.';
        }
      }
    });
  }
}
