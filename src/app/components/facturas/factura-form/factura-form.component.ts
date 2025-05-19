import { Component, OnInit } from '@angular/core';
import { Factura } from '../../../models/factura.model';
import { FacturaService } from '../../../services/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura-form',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './factura-form.component.html',
  styleUrl: './factura-form.component.scss'
})
export class FacturaFormComponent implements OnInit {
  facturaForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService
  ) {
    this.facturaForm = this.fb.group({
      clienteId: [null, [Validators.required, Validators.min(1)]],
      productos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.agregarProducto(); // inicia con un producto visible
  }

  get productos(): FormArray {
    return this.facturaForm.get('productos') as FormArray;
  }

  agregarProducto(): void {
    this.productos.push(this.fb.group({
      nombre: ['', Validators.required],
      precioUnitario: [0, [Validators.required, Validators.min(1)]],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarProducto(index: number): void {
    this.productos.removeAt(index);
  }

  calcularTotal(): number {
    return this.productos.controls.reduce((acc, grupo) => {
      const cantidad = grupo.get('cantidad')?.value || 0;
      const precio = grupo.get('precioUnitario')?.value || 0;
      return acc + cantidad * precio;
    }, 0);
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.facturaForm.invalid || this.productos.length === 0) {
      this.errorMessage = 'Completa todos los campos correctamente y agrega al menos un producto.';
      return;
    }

    const { clienteId, productos } = this.facturaForm.value;
    const factura = { productos };

    this.facturaService.crearFactura(clienteId, factura).subscribe({
      next: () => {
        this.successMessage = 'Factura registrada correctamente.';
        this.facturaForm.reset();
        this.productos.clear();
        this.agregarProducto();
      },
      error: () => {
        this.errorMessage = 'Error al registrar la factura.';
      }
    });
  }
}
