import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../servicios/api';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Gestión de Cursos</h2>

      <form (ngSubmit)="guardarCurso()" class="row g-3">
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.nombre" name="nombre" class="form-control" placeholder="Nombre" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.codigo" name="codigo" class="form-control" placeholder="Código" required>
        </div>
        <div class="col-md-2">
          <input [(ngModel)]="nuevo.creditos" name="creditos" type="number" class="form-control" placeholder="Créditos" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.docente" name="docente" class="form-control" placeholder="Docente" required>
        </div>
        <div class="col-md-1">
          <button class="btn btn-primary w-100">{{ editando ? 'Actualizar' : '+' }}</button>
        </div>
      </form>

      <table class="table table-striped mt-4">
        <thead>
          <tr><th>Nombre</th><th>Código</th><th>Créditos</th><th>Docente</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let curso of cursos">
            <td>{{curso.nombre}}</td>
            <td>{{curso.codigo}}</td>
            <td>{{curso.creditos}}</td>
            <td>{{curso.docente}}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarCurso(curso)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="eliminarCurso(curso.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class CursosComponent implements OnInit {
  cursos: any[] = [];
  nuevo = { nombre: '', codigo: '', creditos: 0, docente: '' };
  editando = false;
  idEditando: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() { this.cargarCursos(); }

  cargarCursos() {
    this.api.getCursos().subscribe(data => this.cursos = data);
  }

  guardarCurso() {
    if (this.editando && this.idEditando) {
      this.api.updateCurso(this.idEditando, this.nuevo).subscribe(() => {
        this.cargarCursos();
        this.resetForm();
      });
    } else {
      this.api.addCurso(this.nuevo).subscribe(() => {
        this.cargarCursos();
        this.resetForm();
      });
    }
  }

  editarCurso(curso: any) {
    this.nuevo = { ...curso };
    this.editando = true;
    this.idEditando = curso.id;
  }

  eliminarCurso(id: string) {
    this.api.deleteCurso(id).subscribe(() => this.cargarCursos());
  }

  resetForm() {
    this.nuevo = { nombre: '', codigo: '', creditos: 0, docente: '' };
    this.editando = false;
    this.idEditando = null;
  }
}