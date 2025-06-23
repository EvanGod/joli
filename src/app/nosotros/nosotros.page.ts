import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ViewChild } from '@angular/core';

import {
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, FooterComponent, IonIcon],
})
export class NosotrosPage implements OnInit {
menuAbierto: boolean = false;
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

  mvvActual: number = 0;

tarjetasMVV = [
  {
    titulo: 'Misión',
    icono: 'flag-outline',
    descripcion: `Transformar el futuro financiero de nuestros clientes mediante la asesoría y orientación sobre estrategias de pensiones, retiro, protección o inversión. Estamos comprometidos a encontrar las soluciones estratégicas más factibles para sus necesidades y objetivos financieros.`
  },
  {
    titulo: 'Visión',
    icono: 'eye-outline',
    descripcion: `Ser reconocidos a nivel nacional como una empresa líder en asesoría financiera por lograr mejorar el retiro y pensión de los mexicanos.`
  },
  {
    titulo: 'Valores',
    icono: 'diamond-outline',
    valores: ['Honestidad', 'Compromiso', 'Responsabilidad', 'Justicia']
  }
];

cambiarMVV(direccion: 'anterior' | 'siguiente') {
  const total = this.tarjetasMVV.length;
  if (direccion === 'anterior') {
    this.mvvActual = (this.mvvActual - 1 + total) % total;
  } else {
    this.mvvActual = (this.mvvActual + 1) % total;
  }
}

}
