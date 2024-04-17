import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaUsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = 'http://127.0.0.1:8000/api/categorias-usuarios';

  getAll(){
    return this.http.get(this.apiUrl + '/show')
  }

  add(data: any){
    return this.http.post<any>(this.apiUrl + '/create', data);
  }

  rm(id: any){
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`);
  }

  check(id: any){
    return this.http.get<boolean>(`${this.apiUrl}/check/${id}`);
  }

  isNavCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


}
