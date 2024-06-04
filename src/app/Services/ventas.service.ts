import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  apiUrl: string = enviroment.apiUrl + '/api/ventas'; // URL base para las solicitudes al backend

  constructor(private http: HttpClient) { }

  // Método para obtener todas las ventas
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para agregar una nueva venta
  add(data: any) {
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para eliminar una venta por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
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
