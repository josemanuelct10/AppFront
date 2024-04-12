import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = 'http://127.0.0.1:8000/api/usuarios';

  getAll(){
    return this.http.get(this.apiUrl + '/show')
  }


}
