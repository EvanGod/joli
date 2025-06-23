import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ViewChild } from '@angular/core';

import {
  IonContent,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  styleUrls: ['./planes.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, FooterComponent]
})
export class PlanesPage implements OnInit {

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
