import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //private http = inject(HttpClient);
  private apiUrl = 'https://effective-space-chainsaw-j49r5grgqvqcpp47-8080.app.github.dev/entity/usuario'; // Ejemplo de API

  constructor(private http:HttpClient) {};

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}