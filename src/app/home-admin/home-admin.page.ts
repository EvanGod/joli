import { Component } from '@angular/core';
import {
  IonContent,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { PropuestaPage } from '../propuesta/propuesta.page';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonMenu,
    IonMenuToggle,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonIcon,
    PropuestaPage,
  ],
})
export class HomeAdminPage {
  vista: 'propuesta' | null = null;

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(true, 'main-menu');
  }

  async mostrarVista(nombre: 'propuesta') {
    this.vista = nombre;
    await this.menuCtrl.close();
  }

  irHome() {
    this.vista = null;
    this.menuCtrl.close();
  }

  cerrarSesion() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}
