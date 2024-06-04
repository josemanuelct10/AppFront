import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PescadoServiceService {

  apiUrl: string = enviroment.apiUrl + '/api/pescados'; // URL base para las solicitudes al backend
  private datosActualizados = new Subject<void>(); // Subject para notificar actualizaciones

  constructor(private http: HttpClient) { }

  // Método para obtener todos los pescados
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para agregar un nuevo pescado
  add(data: any) {
    // Establecer el encabezado Content-Type como multipart/form-data
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para eliminar un pescado por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para obtener un pescado por su ID
  getById(id: any) {
    return this.http.get(`${this.apiUrl}/getById/${id}`, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para actualizar un pescado por su ID
  update(id: any, pescadoActualizado: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, pescadoActualizado, { headers: this.obtenerCabeceraAutorizacion() });
  }

  // Método para actualizar la cantidad de un pescado por su ID
  updateCantidad(pescadoId: number, nuevaCantidad: number) {
    return this.http.put<any>(
      `${this.apiUrl}/updateCantidad/${pescadoId}`,
      { cantidad: nuevaCantidad },
      { headers: this.obtenerCabeceraAutorizacion() }
    );
  }

  // Método para notificar a los suscriptores que los datos han sido actualizados
  notificarActualizacion(): void {
    this.datosActualizados.next();
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
