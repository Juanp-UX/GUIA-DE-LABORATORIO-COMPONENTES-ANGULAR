import { Component } from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../servicios/clienteService';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule,CommonModule,SweetAlert2Module,HttpClientModule],
  selector: 'app-form',
  standalone: true,
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form {
  public formulario!: FormGroup;
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  public crearCliente() {
    console.log('Creando cliente');
    const cliente= this.formulario.value
    this.clienteService.create(cliente).subscribe(
      {
        next: (response) => {
          console.log("Cliente creado exitosamente");
          this.router.navigate(['clientes/listarClientes']);
          Swal.fire('Nuevo cliente',`Cliente ${response.nombre} creado con exito!`,'success');
        },
        error: (err) =>{
          console.error('Error al crear cliente:', err.message);
        }
      }
    )
  }
  ngOnInit():void {
    this.formulario= new FormGroup({
      codigo:new FormControl('',[Validators.required, validarFormatocodigo()],[codigoDuplicadoValidator(this.clienteService)]),
      nombre: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      apellido: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required,Validators.email,validarCorreoUnicauca()])
    });
  }
  
}
export function validarCorreoUnicauca():ValidatorFn {
  return (control: AbstractControl):ValidationErrors | null =>{
    const email = control.value;
    if (!email) return null;
     const dominio= '@unicauca.edu.co';
    return email.endsWith(dominio) ? null : {dominioInvalido: true};
  };
}

export function codigoDuplicadoValidator(clienteService:ClienteService):AsyncValidatorFn {
  return (control: AbstractControl) =>{
    if(!control.value){
      return of(null);
    }
    return clienteService.verificarCodigo(control.value).pipe(
      map(existe => (existe ? {codigoDuplicado: true }: null)),
      catchError(() => of (null))
    );
  };
}

function validarFormatocodigo():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null => {
    const valor =control.value;
    if (!valor) return null;
    const valido = /^\d{3}456$/.test(valor);
    return valido ? null: {codigoInvalido: true};
  };
}