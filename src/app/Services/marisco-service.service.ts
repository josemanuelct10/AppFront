import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MariscoServiceService {

  apiUrl: string = 'http://127.0.0.1:8000/api/mariscos';


  constructor(
    private http : HttpClient
  ) { }

  getAll(){
    return this.http.get(this.apiUrl + '/show')
  }

  add(data: any){
    return this.http.post<any>(this.apiUrl + '/create', data);
  }

  rm(id: any){
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`);
  }

  getById(id: any){
    return this.http.get(`${this.apiUrl}/getById/${id}`);
  }

  update(id: any, mariscoActualizado: any){
    return this.http.put(`${this.apiUrl}/update/${id}`, mariscoActualizado);
  }

  updateCantidad(mariscoId: number, nuevaCantidad: number) {
    return this.http.put<any>(`${this.apiUrl}/updateCantidad/${mariscoId}`, { cantidad: nuevaCantidad });
  }
}
