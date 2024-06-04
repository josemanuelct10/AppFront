import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  apiUrl: string = enviroment.apiUrl + '/api/facturas';

  // Obtener el token de autenticación del sessionStorage
  private authToken: string | null = sessionStorage.getItem('token');

  // Definir encabezados comunes que incluyan el token de autenticación
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authToken,
  });

  constructor(private http: HttpClient) { }

  // Obtener todas las facturas
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.headers });
  }

  // Agregar una nueva factura
  add(data: any) {
    console.log(data, "AAAAA");
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.headers });
  }

  // Obtener el documento PDF de una factura por su ID
  getDocumento(id: number) {
    const url = `${this.apiUrl}/${id}/pdf`;
    console.log(url);
    return this.http.get<Blob>(url, { headers: this.headers, responseType: 'blob' as 'json' });
  }

  // Eliminar una factura por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.headers });
  }

  // Obtener una factura por su ID
  getById(id: number) {
    return this.http.get(`${this.apiUrl}/getById/${id}`, { headers: this.headers });
  }

  // Obtener todas las facturas asociadas a un usuario por su ID
  getByUsuario(id: number) {
    return this.http.get(`${this.apiUrl}/getByUser/${id}`, { headers: this.headers });
  }
}
