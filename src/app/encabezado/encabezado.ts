import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a class="navbar-brand" routerLink="/">Gestión</a>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" routerLink="/alumnos">Alumnos</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/libros">Libros</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/autores">Autores</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/cursos">Cursos</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/notas">Notas</a></li>
      </ul>
    </nav>
  `
})
export class EncabezadoComponent {}