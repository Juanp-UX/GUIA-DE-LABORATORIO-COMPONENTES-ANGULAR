import { Component } from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../servicios/cliente';

@Component({
  imports: [FormsModule],
  selector: 'app-form',
  standalone: true,
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  public crearCliente() {
    console.log('Creando cliente');
    this.clienteService.create(this.cliente).subscribe((response) => {
      console.log('Cliente creado exitosamente');
      console.log(this.cliente);
      this.router.navigate(['/clientes/listarClientes']);
      Swal.fire('Nuevo cliente', `Cliente ${response.nombre} creado con exito!`, 'success');
    });
  }
}
