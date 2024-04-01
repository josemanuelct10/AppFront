import { HttpClient } from '@angular/common/http';
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
    return this.http.post<any>(this.apiUrl + '/create', data);
  }

  rm(id: any){
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`);
  }

  getById(id: any){
    return this.http.get(`${this.apiUrl}/getById/${id}`);
  }


  notificarActualizacion(): void{
    this.datosActualizados.next();
  }
}
