import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoriaUsuariosService {

  apiUrl: string = enviroment.apiUrl + '/api/categorias-usuarios';

  // Obtener el token de autenticación del almacenamiento local
  private authToken: string | null = sessionStorage.getItem('token');

  // Definir encabezados comunes que incluyan el token de autenticación
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authToken
  });

  constructor(
    private http: HttpClient
  ) { }

  // Obtener todas las categorías de usuarios
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.headers });
  }

  // Agregar una nueva categoría de usuario
  add(data: any) {
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.headers });
  }

  // Eliminar una categoría de usuario por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.headers });
  }

  // Verificar si una categoría de usuario existe por su ID
  check(id: any) {
    return this.http.get<boolean>(`${this.apiUrl}/check/${id}`, { headers: this.headers });
  }
}
