import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../servicios/api';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Gestión de Alumnos (MockAPI)</h2>

      <form (ngSubmit)="guardarAlumno()" class="row g-3">
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.nombre" name="nombre" class="form-control" placeholder="Nombre" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.apellido" name="apellido" class="form-control" placeholder="Apellido" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.email" name="email" type="email" class="form-control" placeholder="Email" required>
        </div>
        <div class="col-md-2">
          <input [(ngModel)]="nuevo.carrera" name="carrera" class="form-control" placeholder="Carrera" required>
        </div>
        <div class="col-md-1">
          <button class="btn btn-primary w-100">{{ editando ? 'Actualizar' : '+' }}</button>
        </div>
      </form>

      <table class="table table-striped mt-4">
        <thead>
          <tr><th>Nombre</th><th>Apellido</th><th>Email</th><th>Carrera</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let alumno of alumnos">
            <td>{{alumno.nombre}}</td>
            <td>{{alumno.apellido}}</td>
            <td>{{alumno.email}}</td>
            <td>{{alumno.carrera}}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarAlumno(alumno)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="eliminarAlumno(alumno.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AlumnosComponent implements OnInit {
  alumnos: any[] = [];
  nuevo = { nombre: '', apellido: '', email: '', carrera: '' };
  editando = false;
  idEditando: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.api.getAlumnos().subscribe(data => this.alumnos = data);
  }

  guardarAlumno() {
    if (this.editando && this.idEditando) {
      this.api.updateAlumno(this.idEditando, this.nuevo).subscribe(() => {
        this.cargarAlumnos();
        this.resetForm();
      });
    } else {
      this.api.addAlumno(this.nuevo).subscribe(() => {
        this.cargarAlumnos();
        this.resetForm();
      });
    }
  }

  editarAlumno(alumno: any) {
    this.nuevo = { ...alumno };
    this.editando = true;
    this.idEditando = alumno.id;
  }

  eliminarAlumno(id: string) {
    this.api.deleteAlumno(id).subscribe(() => this.cargarAlumnos());
  }

  resetForm() {
    this.nuevo = { nombre: '', apellido: '', email: '', carrera: '' };
    this.editando = false;
    this.idEditando = null;
  }
}