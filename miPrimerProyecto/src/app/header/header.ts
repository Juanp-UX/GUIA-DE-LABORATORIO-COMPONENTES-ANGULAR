import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  public nombres: string = "Juan"
  public apellidos: string = "P"
  public disciplina: string = "Desarrollador de Software"
  public descripcion: string = "TUKI"
}
