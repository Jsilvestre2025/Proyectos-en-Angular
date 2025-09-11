import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contador } from './contador/contador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Contador],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('¡Hola Mundo con Angular 20.2!');
  mensaje = signal('Aprende a crear componentes reutilizables.');
  totalClicks = signal(0);

  // Manejar eventos del componente hijo
  onContadorCambio(nuevoValor: number) {
    this.totalClicks.set(nuevoValor);
    
    if (nuevoValor === 0) {
      this.mensaje.set('¡Contador reiniciado!');
    } else if (nuevoValor >= 10) {
      this.mensaje.set('¡Excelente! Has llegado a ' + nuevoValor + ' clicks');
    } else {
      this.mensaje.set('Sigue clickeando: ' + nuevoValor + ' clicks');
    }
  }
}
