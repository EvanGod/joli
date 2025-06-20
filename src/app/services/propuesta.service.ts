import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropuestaService {
  private baseUrl = `${environment.apiUrl}/propuestas/propuesta`;

  constructor(private http: HttpClient) {}

  enviarPropuesta(formData: FormData) {
    return this.http.post(this.baseUrl, formData);
  }
}
