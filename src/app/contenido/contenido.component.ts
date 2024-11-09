import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí


@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],  // Asegúrate de incluir FormsModule aquí
  providers: [ApiService],
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
})
export class ContenidoComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = []; // Datos filtrados
  isLoading = true;
  selectedCharacter: any;
  episodes: any[] = [];

  nameFilter: string = ''; // Filtro por nombre
  statusFilter: string = ''; // Filtro por estatus
  speciesFilter: string = ''; // Filtro por especie

  specieColors: { [key: string]: string } = {
    Human: '#414e9a', // Azul
    Alien: '#f0ad4e', // Naranja
    Humanoid: '#5bc0de', // Azul
    Poopybutthole: '#d9534f', // Rojo
    Robot: '#0275d8', // Azul fuerte
  };

  // Paginación
  pageSize = 5;
  currentPage = 1;

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        this.data = response.results;
        this.filteredData = [...this.data]; // Inicializar con los datos completos
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.isLoading = false;
      }
    );
  }

  // Función para aplicar los filtros
  applyFilters(): void {
    this.filteredData = this.data.filter((character) => {
      return (
        (!this.nameFilter || character.name.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
        (!this.statusFilter || character.status === this.statusFilter) &&
        (!this.speciesFilter || character.species === this.speciesFilter)
      );
    });
  }

  showCharacterDetails(character: any): void {
    this.selectedCharacter = character;
    this.episodes = [];
    character.episode.forEach((url: string) => {
      this.http.get(url).subscribe((episode: any) => {
        this.episodes.push(episode);
      });
    });
  }

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
}
