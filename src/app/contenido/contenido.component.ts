import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';  // Asegúrate de importar tu servicio de autenticación
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ],
  providers: [ApiService],
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
})
export class ContenidoComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];

  // mensaje de carga 

  isLoading = true;


  selectedCharacter: any;
  episodes: any[] = [];

  nameFilter: string = '';
  statusFilter: string = '';
  speciesFilter: string = '';

  specieColors: { [key: string]: string } = {
    Human: '#1f77b4',              // Azul oscuro
    Alien: '#27ae60',              // Verde más oscuro
    Humanoid: '#8e44ad',           // Morado oscuro
    Poopybutthole: '#c0392b',      // Rojo oscuro
    Robot: '#16a085',              // Verde azulado oscuro
    Animal: '#e67e22',             // Naranja oscuro
    unknown: '#7f8c8d',            // Gris oscuro
    'Mythological Creature': '#6c3483' // Morado muy oscuro
  };


  pageSize = 20;
  currentPage = 1;

  

  constructor(
    private apiService: ApiService, 
    private http: HttpClient,
    private authService: AuthService, // Inyecta el servicio de autenticación
    private router: Router // Inyecta el servicio Router para redirigir
  ) {}
  ngOnInit(): void {
    this.llenarData();
  }

  // Función para llenar los datos con las  páginas
  llenarData(): void {
    const pagesToLoad = [1, 2, 3];
    const allData: any[] = [];

    pagesToLoad.forEach((page) => {
      this.apiService.getData(page).subscribe(
        (response) => {
          allData.push(...response.results);
          this.data = allData;
          this.filteredData = [...this.data];
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
          this.isLoading = false;
        }
      );
    });
  }


  // busqueda por filtros
  applyFilters(): void {
    this.filteredData = this.data.filter((character) => {
      return (
        (!this.nameFilter || character.name.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
        (!this.statusFilter || character.status === this.statusFilter) &&
        (!this.speciesFilter || character.species === this.speciesFilter)
      );
    });
  }

  //asignar los episodios y abrir modal
  showCharacterDetails(character: any): void {
    this.selectedCharacter = character;
    this.episodes = [];
    character.episode.forEach((url: string) => {
      this.http.get(url).subscribe((episode: any) => {
        this.episodes.push(episode);
      });
    });
  }

  // asignar los colores
  getSpecieColors(species: string): string {
    return this.specieColors[species] || '#ffffff';
  }


  // Paginación 
  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredData.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onLogout(): void {
    this.authService.logout(); // Llama al método logout del servicio de autenticación
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }

}
