import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  apiUrl: string = enviroment.apiUrl + '/api/carrito';

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

  // Método para realizar la comprobación del carrito
  comprobacionCarrito(id: number) {
    return this.http.get(`${this.apiUrl}/comprobar/${id}`, { headers: this.headers });
  }

  // Métodos para añadir, eliminar y actualizar líneas del carrito
  add(data: any) {
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.headers });
  }

  addLinea(data: any) {
    return this.http.post<any>(this.apiUrl + '/newProducto', data, { headers: this.headers });
  }

  rmLinea(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/deleteProducto/${id}`, { headers: this.headers });
  }

  updateLineas(id: any, lineaActualizada: any) {
    return this.http.put(`${this.apiUrl}/actualizarLinea/${id}`, lineaActualizada, { headers: this.headers });
  }

  // Método para eliminar el carrito
  deleteCarrito(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/deleteCarrito/${id}`, { headers: this.headers });
  }
}
