import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorModalService } from '../../services/error-modal.service';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  mensaje: string | null = null;
  tipo: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(private errorService: ErrorModalService) {}

  ngOnInit(): void {
    this.errorService.modal$.subscribe(modal => {
      if (modal) {
        this.mensaje = modal.mensaje;
        this.tipo = modal.tipo;
        setTimeout(() => this.cerrar(), 3000);
      }
    });
  }

  cerrar(): void {
    this.mensaje = null;
  }

  getIcono(): string {
    switch (this.tipo) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'close-circle';
      case 'warning': return 'alert-circle';
      default: return 'information-circle';
    }
  }

  getColor(): string {
    switch (this.tipo) {
      case 'success': return 'success';   
      case 'error': return 'danger';      
      case 'warning': return 'warning';   
      case 'info': return 'primary';      
      default: return 'medium';           
    }
  }
}
