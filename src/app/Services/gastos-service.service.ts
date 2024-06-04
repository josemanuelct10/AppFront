import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class GastosServiceService {

  apiUrl: string = enviroment.apiUrl + '/api/gastos';

  // Obtener el token de autenticación del sessionStorage
  private authToken: string | null = sessionStorage.getItem('token');

  // Definir encabezados comunes que incluyan el token de autenticación
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authToken,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Obtener todos los gastos
  getAll() {
    return this.http.get(this.apiUrl + '/show', { headers: this.headers });
  }

  // Agregar un nuevo gasto
  add(data: any) {
    return this.http.post<any>(this.apiUrl + '/create', data, { headers: this.headers });
  }

  // Obtener el documento de un gasto por su nombre de archivo
  getDocumento(nombreArchivo: string) {
    const url = `${this.apiUrl}/document/${nombreArchivo}`;
    console.log(url);
    return this.http.get<Blob>(url, { headers: this.headers, responseType: 'blob' as 'json' });
  }

  // Eliminar un gasto por su ID
  rm(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`, { headers: this.headers });
  }
}
