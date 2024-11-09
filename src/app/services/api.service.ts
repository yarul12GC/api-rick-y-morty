import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlapi = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get<any>(this.urlapi);
  }
  public getEpisodeDetails(url: string): Observable<any> {
    return this.http.get<any>(url);  // Aquí hacemos la solicitud HTTP para obtener los episodios
  }

}
