import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
  }

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password });
  }

  async guardarToken(token: string) {
    await this.storage.set(this.tokenKey, token);
  }

  async obtenerToken() {
    return this.storage.get(this.tokenKey);
  }

  async logout() {
    await this.storage.remove(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
