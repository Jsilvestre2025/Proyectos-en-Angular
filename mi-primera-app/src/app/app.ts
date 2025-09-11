import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ mensaje }}</p>
      <button (click)="cambiarMensaje()">{{ textBoton }}</button>
      
      <div class="info">
        <h3>¡Información sobre Angular!</h3>
        <ul>
          <li>Framework desarrollado por Google</li>
          <li>Basado en TypeScript</li>
          <li>Perfect para aplicaciones SPA</li>
          <li>Componentes reutilizables</li>
        </ul>
      </div>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  title = '¡Hola Mundo con Angular!';
  mensaje = 'Esta es mi primera aplicación Angular con componentes standalone.';
  textBoton = 'Cambiar mensaje';
  mensajeAlternativo = false;

  cambiarMensaje() {
    if (!this.mensajeAlternativo) {
      this.mensaje = '¡Mensaje cambiado! Angular es genial 🚀';
      this.textBoton = 'Mensaje original';
    } else {
      this.mensaje = 'Esta es mi primera aplicación Angular con componentes standalone.';
      this.textBoton = 'Cambiar mensaje';
    }
    this.mensajeAlternativo = !this.mensajeAlternativo;
  }
}

