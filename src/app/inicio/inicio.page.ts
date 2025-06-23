import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ViewChild } from '@angular/core';

import {
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    FooterComponent,
    IonIcon
  ]
})
export class InicioPage implements OnInit {
  imagenesCarrusel: string[] = [
    'assets/banner-home.jpg',
    'assets/banner-home.jpg'
  ];

  imagenActual: number = 0;
  menuAbierto: boolean = false;


  ngOnInit() {
    setInterval(() => {
      this.imagenActual = (this.imagenActual + 1) % this.imagenesCarrusel.length;
    }, 5000);
  }

  @ViewChild('contenido', { static: false }) contenido!: IonContent;

  scrollTo(id: string) {
    const elemento = document.getElementById(id);
    if (elemento) {
      const y = elemento.offsetTop;
      this.contenido.scrollToPoint(0, y - 80, 500); 
    }
  }

  testimonioActual: number = 0;

testimonios: any[] = [
  {
    nombre: 'Guadalupe Pérez',
    mensaje: 'SUPER RECOMIENDO!!! Excelente atención!! Financiaron mi modalidad 40, trámite sencillo, información transparente y profesionalismo. Muy satisfecha!'
  },
  {
    nombre: 'Ivan Vázquez',
    mensaje: 'Excelente servicio, atención personalizada, jamás te dejan solo, resuelven todas tus dudas y lo mejor, te dan esa confianza que se requiere al 100%.'
  },
  {
    nombre: 'Luis Bernardo Arellano Eguiza',
    mensaje: 'Más que asesores, buenos seres humanos. Muy profesionales. Los recomiendo enteramente. Sigan así ...'
  }
];

cambiarTestimonio(direccion: 'anterior' | 'siguiente') {
  if (direccion === 'anterior') {
    this.testimonioActual =
      (this.testimonioActual - 1 + this.testimonios.length) % this.testimonios.length;
  } else {
    this.testimonioActual = (this.testimonioActual + 1) % this.testimonios.length;
  }
}


}
