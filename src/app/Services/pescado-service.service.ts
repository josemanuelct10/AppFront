import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PescadoServiceService {

  apiUrl: string = 'http://127.0.0.1:8000/api/pescados';

  private datosActualizados = new Subject<void>();

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get(this.apiUrl + '/show')
  }

  add(data: any){
    const headers = new HttpHeaders();
    // Establecer el encabezado Content-Type como multipart/form-data
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl + '/create', data, {headers: headers});
  }

  rm(id: any){
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`);
  }

  getById(id: any){
    return this.http.get(`${this.apiUrl}/getById/${id}`);
  }

  update(id: any, pescadoActualizado: any){
    return this.http.put(`${this.apiUrl}/update/${id}`, pescadoActualizado);
  }

  updateCantidad(pescadoId: number, nuevaCantidad: number) {
    return this.http.put<any>(`${this.apiUrl}/updateCantidad/${pescadoId}`, { cantidad: nuevaCantidad });
  }


  notificarActualizacion(): void{
    this.datosActualizados.next();
  }
}
