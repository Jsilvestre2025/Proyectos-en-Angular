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
  title = signal('Mi Aplicación Angular');
  mensaje = signal('¡Bienvenido a Angular 20.2!');
  totalClicks = signal(0);
  contador = signal(0);
  mostrarInfo = signal(false);
    cambiarMensaje() {
    const mensajes = [
      '¡Bienvenido a Angular 20.2!',
      '¡Angular está evolucionando!',
      '¡Signals son geniales!'
    ];
    const random = Math.floor(Math.random() * mensajes.length);
    this.mensaje.set(mensajes[random]);
    this.contador.set(this.contador() + 1);
  }

  toggleInfo() {
    this.mostrarInfo.set(!this.mostrarInfo());
  }

  reiniciar() {
    this.mensaje.set('¡Bienvenido a Angular 20.2!');
    this.contador.set(0);
    this.mostrarInfo.set(false);
  }
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
