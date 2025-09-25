import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <-- Importación CLAVE
import { CommonModule } from '@angular/common';     // <-- Importación para usar *ngIf

@Component({
  selector: 'app-juego-numeros',
  standalone: true, // <-- Asegúrate de que sea standalone
  imports: [CommonModule], // <-- Añade CommonModule para las directivas
  templateUrl: './juego-numeros.html',
  styleUrl: './juego-numeros.css'
})
export class JuegoNumeros {
  numeroActual: number = 0;
  haGanado: boolean = false;
  mensaje: string = 'Presiona el botón para probar tu suerte';
  intentos: number = 0;

  // Paso 1: Inyecta PLATFORM_ID en el constructor
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Paso 2: Crea el método que tu HTML llamará
  lanzarNumero(): void {
    // Paso 3: Protege TODA la lógica que depende del navegador dentro de este "if"
    if (isPlatformBrowser(this.platformId)) {
      this.intentos++;
      const numeroRandom = Math.floor(Math.random() * 10) + 1; // Genera un número del 1 al 10
      this.numeroActual = numeroRandom;

      if (this.numeroActual === 7) {
        this.haGanado = true;
        this.mensaje = `¡Felicidades! Obtuviste el 7 en ${this.intentos} intentos.`;
        // alert('¡Ganaste!'); // 'alert' también rompería el SSR. Lo manejamos en el template.
      } else {
        this.haGanado = false;
        this.mensaje = `Salió el ${this.numeroActual}. ¡Sigue intentando!`;
      }
    }
  }

  reiniciarJuego(): void {
    this.numeroActual = 0;
    this.haGanado = false;
    this.mensaje = 'Presiona el botón para probar tu suerte';
    this.intentos = 0;
  }
}