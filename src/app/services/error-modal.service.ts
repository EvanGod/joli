import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorModalService {
  private modalSubject = new BehaviorSubject<{ mensaje: string, tipo: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  readonly modal$ = this.modalSubject.asObservable();

  show(mensaje: string, tipo: 'success' | 'error' | 'info' | 'warning' = 'info') {
    this.modalSubject.next({ mensaje, tipo });
    setTimeout(() => this.hide(), 1500);
  }

  hide() {
    this.modalSubject.next(null);
  }
}
