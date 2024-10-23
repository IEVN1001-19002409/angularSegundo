
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
interface ResultadoZodiaco {
  nombre: string;

  dia: number;
  mes: number;
  anio: number;
  sexo: string;
  animal: string;
  img: string;

}
@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './zodiaco.component.html',
  
})
export default class ZodiacoComponent {
  formulario!: FormGroup;

  resultado: ResultadoZodiaco | null = null;
  resultado2: string | null=null;
  constructor() { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      a_paterno: new FormControl('', Validators.required),
      a_materno: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
      mes: new FormControl('', Validators.required),
      anio: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),


    });
  }
  validaAnio ():void{
    let anio = parseInt(this.formulario.get('anio')?.value);
    if (anio<1924) {
      this.resultado2="Fecha invalida";
      this.resultado=null;
    }else if(anio > 2024){
      this.resultado2="Aun no naces";
      this.resultado=null;
    }else{
      this.generarZodiaco();
      this.dameFechaActual();
      this.resultado2=null;
    }
  }
  dameFechaActual(): void{
    let hoy = new Date();
    let dia = parseInt(this.formulario.get('dia')?.value);
    let mes = parseInt(this.formulario.get('mes')?.value);
    let anio = parseInt(this.formulario.get('anio')?.value);
    hoy.getMonth();
    
    console.log(hoy.getMonth());
  }
  generarZodiaco(): void {
    const signosChinos = [
      "Rata", "Buey", "Tigre", "Conejo", "Dragón",
      "Serpiente", "Caballo", "Cabra", "Mono",
      "Gallo", "Perro", "Cerdo"
    ];
    let mes = this.formulario.get('mes')?.value;
    let hoy = new Date();
    let mesMenos = mes-1;
    
    let nombre = this.formulario.get('nombre')?.value;
    let a_paterno = this.formulario.get('a_paterno')?.value;
    let a_materno = this.formulario.get('a_materno')?.value;
    let dia = parseInt(this.formulario.get('dia')?.value);
    
    let anio = parseInt(this.formulario.get('anio')?.value);
    const ciclo = (anio - 1924) % 12;
    let signo = signosChinos[ciclo];
    let sexo = this.formulario.get('sexo')?.value;
    let edad = 0;
    let diaHoy = hoy.getDay;
    

    if (mesMenos==hoy.getMonth() && dia>11) {
      edad = 2024 - anio-1;
    }
    else if (mesMenos>hoy.getMonth()) {
      
       edad = 2024 - anio-1;
    }else{
       edad = 2024 - anio;
    }
    let animal = '';
    let img='';
    let nombreCom = nombre + " " + a_paterno + " " + a_materno;
    console.log(ciclo);
    switch (ciclo) {
      case 0:
          img='https://upload.wikimedia.org/wikipedia/commons/0/04/Rat.svg';
        break;
      case 1:
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ox.svg/800px-Ox.svg.png';
        break;
      case 2:
          img='https://upload.wikimedia.org/wikipedia/commons/e/e3/Tiger.svg';
        break;
      case 3:
          img='https://upload.wikimedia.org/wikipedia/commons/2/24/Rabbit.svg';
        break;
      case 4:
          img='https://upload.wikimedia.org/wikipedia/commons/b/b2/Dragon.svg';
        break;
      case 5:
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Snake.svg/1200px-Snake.svg.png';
        break;
      case 6:
          img='https://upload.wikimedia.org/wikipedia/commons/7/76/Horse.svg';
        break;
      case 7:
          img='https://upload.wikimedia.org/wikipedia/commons/2/2d/Goat.svg';
        break;
      case 8:
          img='https://upload.wikimedia.org/wikipedia/commons/b/b8/Monkey.svg';
        break;
      case 9:
          img='https://upload.wikimedia.org/wikipedia/commons/0/06/Rooster.svg';
        break;
      case 10:
          img='https://upload.wikimedia.org/wikipedia/commons/4/4a/Dog_2.svg';
        break;
      case 11:
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Boar.svg/800px-Boar.svg.png';
        break;
    
      default:
        img='';

        break;
    }
    this.resultado = {
      nombre: nombreCom,
      dia: dia,
      mes: mes,
      anio: edad,
      sexo: sexo,
      animal: signo,
      img:img
    };

  }
}
