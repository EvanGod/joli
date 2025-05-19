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
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.page.html',
  styleUrls: ['./seguros.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FooterComponent, IonButtons, IonButton, IonIcon],
})
export class SegurosPage implements OnInit {

  constructor() { }

  ngOnInit() {
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
