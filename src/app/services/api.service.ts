import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlapi = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  // Método para obtener los datos de una página específica
  public getData(page: number = 1): Observable<any> {
    const urlWithPage = `${this.urlapi}?page=${page}`;  
    return this.http.get<any>(urlWithPage);
  }

  public getEpisodeDetails(url: string): Observable<any> {
    return this.http.get<any>(url);  
  }
}
