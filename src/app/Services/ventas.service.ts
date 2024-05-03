import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = 'http://127.0.0.1:8000/api/ventas';

  getAll(){
    return this.http.get(this.apiUrl + '/show')
  }

  add(data: any){
    return this.http.post<any>(this.apiUrl + '/create', data);
  }

  rm(id: any){
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`);
  }

}
