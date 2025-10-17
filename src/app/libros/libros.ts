import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../servicios/api';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Gestión de Libros</h2>

      <form (ngSubmit)="guardarLibro()" class="row g-3">
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.titulo" name="titulo" class="form-control" placeholder="Título" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.autor" name="autor" class="form-control" placeholder="Autor" required>
        </div>
        <div class="col-md-2">
          <input [(ngModel)]="nuevo.anio" name="anio" type="number" class="form-control" placeholder="Año" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.editorial" name="editorial" class="form-control" placeholder="Editorial" required>
        </div>
        <div class="col-md-1">
          <button class="btn btn-primary w-100">{{ editando ? 'Actualizar' : '+' }}</button>
        </div>
      </form>

      <table class="table table-striped mt-4">
        <thead>
          <tr><th>Título</th><th>Autor</th><th>Año</th><th>Editorial</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let libro of libros">
            <td>{{libro.titulo}}</td>
            <td>{{libro.autor}}</td>
            <td>{{libro.anio}}</td>
            <td>{{libro.editorial}}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarLibro(libro)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="eliminarLibro(libro.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class LibrosComponent implements OnInit {
  libros: any[] = [];
  nuevo = { titulo: '', autor: '', anio: 0, editorial: '' };
  editando = false;
  idEditando: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() { this.cargarLibros(); }

  cargarLibros() {
    this.api.getLibros().subscribe(data => this.libros = data);
  }

  guardarLibro() {
    if (this.editando && this.idEditando) {
      this.api.updateLibro(this.idEditando, this.nuevo).subscribe(() => {
        this.cargarLibros();
        this.resetForm();
      });
    } else {
      this.api.addLibro(this.nuevo).subscribe(() => {
        this.cargarLibros();
        this.resetForm();
      });
    }
  }

  editarLibro(libro: any) {
    this.nuevo = { ...libro };
    this.editando = true;
    this.idEditando = libro.id;
  }

  eliminarLibro(id: string) {
    this.api.deleteLibro(id).subscribe(() => this.cargarLibros());
  }

  resetForm() {
    this.nuevo = { titulo: '', autor: '', anio: 0, editorial: '' };
    this.editando = false;
    this.idEditando = null;
  }
}