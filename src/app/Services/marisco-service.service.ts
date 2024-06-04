import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class MariscoServiceService {

  apiUrl: string = enviroment.apiUrl + '/api/mariscos'; // URL base para las solicitudes al backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los mariscos
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para agregar un nuevo marisco
  add(data: any) {
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para eliminar un marisco por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para obtener un marisco por su ID
  getById(id: any) {
    return this.http.get(`${this.apiUrl}/getById/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para actualizar un marisco por su ID
  update(id: any, mariscoActualizado: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, mariscoActualizado, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para actualizar la cantidad de un marisco por su ID
  updateCantidad(mariscoId: number, nuevaCantidad: number) {
    return this.http.put<any>(
      `${this.apiUrl}/updateCantidad/${mariscoId}`,
      { cantidad: nuevaCantidad },
      { headers: this.obtenerCabeceraAutorizacion() }
    );
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
