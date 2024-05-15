import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  apiUrl: string = 'http://127.0.0.1:8000/api/carrito';

  constructor(
    private http: HttpClient
  ) { }

  comprobacionCarrito(id: number){
    return this.http.get(`${this.apiUrl}/comprobar/${id}`);
  }

  add(data: any){
    return this.http.post<any>(this.apiUrl + '/create', data);
  }

  addLinea(data: any){
    return this.http.post<any>(this.apiUrl + '/newProducto', data);
  }

  rmLinea(id: number){
    return this.http.delete<any>(`${this.apiUrl}/deleteProducto/${id}`);
  }

  updateLineas(id: any, lineaActualizada: any){
    return this.http.put(`${this.apiUrl}/actualizarLinea/${id}`, lineaActualizada);
  }

  deleteCarrito(id: number){
    return this.http.delete<any>(`${this.apiUrl}/deleteCarrito/${id}`);
  }
}
