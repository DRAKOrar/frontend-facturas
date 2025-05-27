import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';
@Component({
  selector: 'app-editar-cliente-modal',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './editar-cliente-modal.component.html',
  styleUrl: './editar-cliente-modal.component.scss'
})
export class EditarClienteModalComponent {
  @Input() cliente!: Cliente;
  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizado = new EventEmitter<Cliente>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.cliente.nombre, Validators.required],
      correo: [this.cliente.correo, [Validators.required, Validators.email]],
      telefono: [this.cliente.telefono, Validators.required],
      direccion: [this.cliente.direccion, Validators.required],
      cedula: [this.cliente.cedula, Validators.required]
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const clienteActualizado: Cliente = {
      ...this.cliente,
      ...this.form.value
    };

    this.clienteService.actualizarCliente(clienteActualizado.id!, clienteActualizado).subscribe({
      next: (resp) => {
        this.actualizado.emit(resp);
        this.cerrar.emit();
      },
      error: () => alert('Error al actualizar el cliente')
    });
  }

  cerrarConAnimacion(): void {
  const modal = document.querySelector('.modal-dialog') as HTMLElement;
  if (modal) {
    modal.classList.add('modal-close-animation');
    setTimeout(() => this.cerrar.emit(), 300); // espera que termine la animación
  } else {
    this.cerrar.emit();
  }
}


}
