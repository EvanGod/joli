import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ViewChild } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    CommonModule,
    FormsModule,
    FooterComponent
  ]
})
export class InicioPage implements OnInit {
  imagenesCarrusel: string[] = [
    'assets/banner-home.webp',
    'assets/banner-home.webp'
  ];

  imagenActual: number = 0;

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

}
