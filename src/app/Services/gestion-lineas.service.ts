import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class GestionLineasService {

  lineasActualizadas: EventEmitter<any> = new EventEmitter();

  lineas: any[] = [];

  apiUrl: string = enviroment.apiUrl + '/api/facturas/linea/create';

  // Obtener el token de autenticación del sessionStorage
  private authToken: string | null = sessionStorage.getItem('token');

  // Definir encabezados comunes que incluyan el token de autenticación
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authToken,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  addLinea(linea: any){
    this.lineas.push(linea);
  }

  getLineas() {
    return this.lineas;
  }

  addLineaBD(data: any){
    return this.http.post<any>(this.apiUrl, data, { headers: this.headers });
  }

  vaciarLineas() {
    this.lineas = [];
  }
}
