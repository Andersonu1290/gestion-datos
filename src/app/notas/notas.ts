import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../servicios/api';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Gestión de Notas</h2>

      <form (ngSubmit)="guardarNota()" class="row g-3">
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.alumno" name="alumno" class="form-control" placeholder="Alumno" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.curso" name="curso" class="form-control" placeholder="Curso" required>
        </div>
        <div class="col-md-2">
          <input [(ngModel)]="nuevo.nota" name="nota" type="number" min="0" max="20" class="form-control" placeholder="Nota" required>
        </div>
        <div class="col-md-3">
          <input [(ngModel)]="nuevo.observaciones" name="observaciones" class="form-control" placeholder="Observaciones">
        </div>
        <div class="col-md-1">
          <button class="btn btn-primary w-100">{{ editando ? 'Actualizar' : '+' }}</button>
        </div>
      </form>

      <table class="table table-striped mt-4">
        <thead>
          <tr><th>Alumno</th><th>Curso</th><th>Nota</th><th>Observaciones</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let n of notas">
            <td>{{n.alumno}}</td>
            <td>{{n.curso}}</td>
            <td>{{n.nota}}</td>
            <td>{{n.observaciones}}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarNota(n)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="eliminarNota(n.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class NotasComponent implements OnInit {
  notas: any[] = [];
  nuevo = { alumno: '', curso: '', nota: 0, observaciones: '' };
  editando = false;
  idEditando: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() { this.cargarNotas(); }

  cargarNotas() {
    this.api.getNotas().subscribe(data => this.notas = data);
  }

  guardarNota() {
    if (this.editando && this.idEditando) {
      this.api.updateNota(this.idEditando, this.nuevo).subscribe(() => {
        this.cargarNotas();
        this.resetForm();
      });
    } else {
      this.api.addNota(this.nuevo).subscribe(() => {
        this.cargarNotas();
        this.resetForm();
      });
    }
  }

  editarNota(nota: any) {
    this.nuevo = { ...nota };
    this.editando = true;
    this.idEditando = nota.id;
  }

  eliminarNota(id: string) {
    this.api.deleteNota(id).subscribe(() => this.cargarNotas());
  }

  resetForm() {
    this.nuevo = { alumno: '', curso: '', nota: 0, observaciones: '' };
    this.editando = false;
    this.idEditando = null;
  }
}