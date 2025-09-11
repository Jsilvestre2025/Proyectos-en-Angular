import { Component, signal, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contador.html',
  styleUrl: './contador.css'
})
export class Contador implements OnInit {
  // Inputs - datos que recibe el componente
  valorInicial = input(0);
  titulo = input('Contador');
  maximo = input(100);
  
  // Outputs - eventos que emite el componente
  cambioValor = output<number>();
  
  // Estado interno del componente
  valor = signal(0);
  
  ngOnInit() {
    // Inicializar con el valor recibido
    this.valor.set(this.valorInicial());
  }
  
  incrementar() {
    const nuevoValor = this.valor() + 1;
    if (nuevoValor <= this.maximo()) {
      this.valor.set(nuevoValor);
      this.cambioValor.emit(nuevoValor);
    }
  }
  
  decrementar() {
    const nuevoValor = this.valor() - 1;
    if (nuevoValor >= 0) {
      this.valor.set(nuevoValor);
      this.cambioValor.emit(nuevoValor);
    }
  }
  
  reiniciar() {
    this.valor.set(this.valorInicial());
    this.cambioValor.emit(this.valorInicial());
  }
}