import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticatedSubject = this.isAuthenticated.asObservable();

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === 'rick' && password === 'morty123') {
      this.isAuthenticated.next(true); // Cambiar el estado a autenticado
      return true; // Inicio de sesión exitoso
    }
    return false; // Inicio de sesión fallido
  }

  logout(): void {
    this.isAuthenticated.next(false); // Cambiar el estado a no autenticado
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated.getValue();
  }
}
