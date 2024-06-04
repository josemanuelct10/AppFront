import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {

  apiUrl: string = enviroment.apiUrl + '/api/proveedores'; // URL base para las solicitudes al backend

  // Aquí puedes almacenar el token de autenticación, por ejemplo, en una propiedad privada
  private authToken: string | null = sessionStorage.getItem('token');

  // Definir encabezados comunes que incluyan el token de autenticación
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authToken
  });

  constructor(
    private http: HttpClient
  ) { }

  // Método para obtener todos los proveedores
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.headers });
  }

  // Método para agregar un nuevo proveedor
  add(data: any) {
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.headers });
  }

  // Método para eliminar un proveedor por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.headers });
  }

  // Método para obtener un proveedor por su ID
  getById(id: any) {
    return this.http.get(`${this.apiUrl}/getById/${id}`, { headers: this.headers });
  }

  // Método para actualizar un proveedor por su ID
  update(id: any, proveedorActualizado: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, proveedorActualizado, { headers: this.headers });
  }
}
