import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonicModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class FooterComponent {

  enviarWhatsApp(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const nombre = (form.querySelector('[name="nombre"]') as HTMLInputElement).value;
  const telefono = (form.querySelector('[name="telefono"]') as HTMLInputElement).value;
  const correo = (form.querySelector('[name="correo"]') as HTMLInputElement).value;
  const interes = (form.querySelector('[name="interes"]') as HTMLSelectElement).value;

  const mensaje = `Hola Joli, me gustaría ser contactado por un especialista.\n\n` +
    ` Nombre: ${nombre}\n Teléfono: ${telefono}\n Correo: ${correo}\n Interés: ${interes}`;

  const url = `https://wa.me/5214424252452?text=${encodeURIComponent(mensaje)}`;

  window.open(url, '_blank');
}

}


