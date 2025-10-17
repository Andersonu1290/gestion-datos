import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from './encabezado/encabezado';
import { PieComponent } from './pie/pie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EncabezadoComponent, PieComponent],
  template: `
    <app-encabezado></app-encabezado>
    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
    <app-pie></app-pie>
  `
})
export class AppComponent {}