import { Component } from '@angular/core';
import {
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ErrorModalService } from '../services/error-modal.service';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    ErrorModalComponent,
    LoadingSpinnerComponent,
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  cargando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loading: LoadingService,
    private errorModal: ErrorModalService
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.errorModal.show('Ingresa tu correo y contraseña', 'warning');
      return;
    }

    this.loading.show();

    this.authService.login(this.email, this.password).subscribe({
      next: async (res: any) => {
        await this.authService.guardarToken(res.token);
        this.errorModal.show('Inicio de sesión exitoso', 'success');
        this.email = '';
        this.password = '';

        setTimeout(() => {
          this.router.navigate(['/home-admin']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.errorModal.show(
          err.error.message || 'Error al iniciar sesión',
          'error'
        );
        this.loading.hide();
      },
      complete: () => {
        this.loading.hide();
      },
    });
  }
}
