import { Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos';
import { LibrosComponent } from './libros/libros';
import { AutoresComponent } from './autores/autores';
import { CursosComponent } from './cursos/cursos';
import { NotasComponent } from './notas/notas';

export const routes: Routes = [
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'autores', component: AutoresComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'notas', component: NotasComponent },
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' }
];

