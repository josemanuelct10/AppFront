import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  apiUrl: string = enviroment.apiUrl + '/api/usuarios'; // URL base para las solicitudes al backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para actualizar un usuario por su ID
  update(id: any, usuarioActualizado: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, usuarioActualizado, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para obtener un usuario por su ID
  getById(id: any) {
    return this.http.get(`${this.apiUrl}/getById/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para eliminar un usuario por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para obtener usuarios por su categoría
  getByCategoria(id: any) {
    return this.http.get(`${this.apiUrl}/getByCategoria/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método privado para obtener las cabeceras de autorización
  private obtenerCabeceraAutorizacion(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }
}
