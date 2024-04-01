import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://127.0.0.1:8000/api/user';

  registro(datosUsuario: any){
    return this.http.post(this.apiUrl + '/create', datosUsuario);

  }

  login(formData: any) {
    return this.http.post<any>(this.apiUrl + '/login', formData);
  }

}
