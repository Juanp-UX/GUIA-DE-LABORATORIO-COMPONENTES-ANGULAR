
import { Cliente } from '../modelos/cliente';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SweetAlert2LoaderService, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {ClienteService} from '../servicios/cliente';
import Swal from 'sweetalert2';

@Component({
  imports: [CommonModule,RouterLink,HttpClientModule,SweetAlert2Module],
  selector: 'app-clientes',
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes {

  clientes: Cliente[] = [];

  constructor(private objClienteService: ClienteService) {}
  ngOnInit(): void {
    this.objClienteService.getClientes().subscribe(
      clientes =>{
        console.log("listando clientes");
        this.clientes = clientes;
      }
    )
  }
}
