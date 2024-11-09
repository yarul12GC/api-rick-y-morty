import { Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // se poteje la ruta con el  AuthGuard para corroborar que se alla iniciado sesion 
  { path: 'contenido', component: ContenidoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];
