import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  title = '¡Hola Mundo con Angular!';
  mensaje = 'Esta es mi primera aplicación Angular con routing y componentes standalone.';
}
