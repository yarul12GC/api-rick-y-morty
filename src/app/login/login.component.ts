import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-login',
  standalone: true,  // Marca como autónomo
  imports: [FormsModule, CommonModule],  // Incluye FormsModule y CommonModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Intentamos iniciar sesión con el usuario y la contraseña
    const isLoggedIn = this.authService.login(this.username, this.password);

    if (isLoggedIn) {
      this.router.navigate(['/contenido']); // Redirigir a la página de contenido si el login es exitoso
    } else {
      this.errorMessage = 'Credenciales incorrectas. Intente de nuevo.';
    }
  }
}
