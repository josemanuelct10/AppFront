import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://127.0.0.1:8000/api/user';
  private token: string | null = null;

  registro(datosUsuario: any){
    return this.http.post(this.apiUrl + '/create', datosUsuario);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.guardarToken(response.token);
      })
    );
  }

  limpiarToken(): void {
    localStorage.removeItem('token');
  }


  private guardarToken(token: string): void {
    console.log(token);
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('categoriaUsuario');
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  obtenerCabeceraAutorizacion(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }




}
