import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../servicios/api';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Gestión de Autores</h2>

      <form (ngSubmit)="guardarAutor()" class="row g-3">
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.nombre" name="nombre" class="form-control" placeholder="Nombre" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.nacionalidad" name="nacionalidad" class="form-control" placeholder="Nacionalidad" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.fechaNacimiento" name="fechaNacimiento" type="date" class="form-control" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.biografia" name="biografia" class="form-control" placeholder="Biografía" required>
        </div>
        <div class="col-12">
          <button class="btn btn-primary">{{ editando ? 'Actualizar' : 'Agregar' }}</button>
        </div>
      </form>

      <table class="table table-striped mt-4">
        <thead>
          <tr><th>Nombre</th><th>Nacionalidad</th><th>Fecha Nac.</th><th>Biografía</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let autor of autores">
            <td>{{autor.nombre}}</td>
            <td>{{autor.nacionalidad}}</td>
            <td>{{autor.fechaNacimiento}}</td>
            <td>{{autor.biografia}}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarAutor(autor)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="eliminarAutor(autor.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AutoresComponent implements OnInit {
  autores: any[] = [];
  nuevo = { nombre: '', nacionalidad: '', fechaNacimiento: '', biografia: '' };
  editando = false;
  idEditando: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() { this.cargarAutores(); }

  cargarAutores() {
    this.api.getAutores().subscribe(data => this.autores = data);
  }

  guardarAutor() {
    if (this.editando && this.idEditando) {
      this.api.updateAutor(this.idEditando, this.nuevo).subscribe(() => {
        this.cargarAutores();
        this.resetForm();
      });
    } else {
      this.api.addAutor(this.nuevo).subscribe(() => {
        this.cargarAutores();
        this.resetForm();
      });
    }
  }

  editarAutor(autor: any) {
    this.nuevo = { ...autor };
    this.editando = true;
    this.idEditando = autor.id;
  }

  eliminarAutor(id: string) {
    this.api.deleteAutor(id).subscribe(() => this.cargarAutores());
  }

  resetForm() {
    this.nuevo = { nombre: '', nacionalidad: '', fechaNacimiento: '', biografia: '' };
    this.editando = false;
    this.idEditando = null;
  }
}