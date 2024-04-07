import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {

  apiUrl: string = 'http://127.0.0.1:8000/api/proveedores';


  constructor(
    private http: HttpClient
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

  update(id: any, proveedorActualizado: any){
    return this.http.put(`${this.apiUrl}/update/${id}`, proveedorActualizado);
  }

}
