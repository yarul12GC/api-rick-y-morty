import { Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta de inicio, lleva al login
  { path: 'contenido', component: ContenidoComponent }, // Ruta a contenido (debe estar protegida)
];
