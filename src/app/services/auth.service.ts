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
      this.isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated.getValue();
  }
}
