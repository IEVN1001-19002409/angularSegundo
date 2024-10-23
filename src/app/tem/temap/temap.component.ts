import { Component } from '@angular/core';

@Component({
  selector: 'app-temap',
  standalone: true,
  imports: [],
  templateUrl: './temap.component.html',
  styles: ``
})
export class TemapComponent {

  title = 'hola desde papa';

  mensaje2:string=""
  recibirMensaje(mensaje:string){
    this.mensaje2=mensaje
  }

}
