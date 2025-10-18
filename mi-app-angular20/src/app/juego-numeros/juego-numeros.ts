import { Component, signal, computed, effect } from '@angular/core';
@Component({
  selector: 'app-juego-numeros',
  imports: [],
  templateUrl: './juego-numeros.html',
  styleUrl: './juego-numeros.css',
})
export class JuegoNumeros {
  numeroActual = signal(0);
  mensaje = signal('🎲 Presiona el botón para empezar');
  intentos = signal(0);
  haGanado = signal(false);
  historial = signal<number[]>([]);
  puntuacion = signal(0);
  constructor() {
    // Cargar datos guardados
    const datosGuardados = localStorage.getItem('juegoNumeros');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      this.puntuacion.set(datos.puntuacion || 0);
    }

    // Effect para guardar automáticamente
    effect(() => {
      const datos = {
        puntuacion: this.puntuacion(),
        ultimaPartida: new Date().toISOString(),
      };
      localStorage.setItem('juegoNumeros', JSON.stringify(datos));
    });
  }
  // ¡Nuevo! Signal computado que se actualiza automáticamente
  estadoJuego = computed(() => {
    if (this.haGanado()) return '🎉 ¡GANASTE!';
    if (this.intentos() === 0) return '🎮 ¡Listo para jugar!';
    return `🎯 Intento ${this.intentos()}`;
  });
  // Signal computado para nivel de dificultad
  nivelDificultad = computed(() => {
    const intentos = this.intentos();
    if (intentos < 3) return '🟢 Fácil';
    if (intentos < 6) return '🟡 Medio';
    return '🔴 Difícil';
  });
  generarNumero() {
    const nuevoNumero = Math.floor(Math.random() * 10) + 1;
    this.historial.update((hist) => [...hist, nuevoNumero]);
    this.numeroActual.set(nuevoNumero);
    this.intentos.update((i) => i + 1);

    if (nuevoNumero === 7) {
      this.mensaje.set('🎉 ¡INCREÍBLE! ¡Obtuviste el 7! 🎉');
      this.haGanado.set(true);
      const puntos = Math.max(100 - this.intentos() * 10, 10);
      this.puntuacion.update((p) => p + puntos);
    } else if (nuevoNumero > 7) {
      this.mensaje.set('📈 ¡Muy alto! El 7 es menor');
    } else {
      this.mensaje.set('📉 ¡Muy bajo! El 7 es mayor');
    }
  }

  reiniciarJuego() {
    this.historial.set([]);
    this.numeroActual.set(0);
    this.mensaje.set('🎲 Presiona el botón para empezar');
    this.intentos.set(0);
    this.haGanado.set(false);
  }
}
