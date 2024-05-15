import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  apiUrl: string = 'http://127.0.0.1:8000/api/user';
  private token: string | null = null;
  private tokenExpirationKey = 'token_expiration';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  registro(datosUsuario: any): Observable<any> {
    return this.http.post(this.apiUrl + '/create', datosUsuario);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.guardarToken(response.token);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  limpiarToken(): void {
    sessionStorage.removeItem('token'); // Cambio aquí
    sessionStorage.removeItem(this.tokenExpirationKey); // Cambio aquí
    this.token = null;
  }

  private guardarToken(token: string): void {
    sessionStorage.setItem('token', token); // Cambio aquí
    const expiration = new Date(new Date().getTime() + 3600 * 1000); // Adjust as needed
    sessionStorage.setItem(this.tokenExpirationKey, expiration.toISOString()); // Cambio aquí
    this.token = token;
  }

  getCategoriaUsuario() {
    return localStorage.getItem('categoriaUsuario');
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  logout(): void {
    this.limpiarToken();
    sessionStorage.removeItem('idUsuario'); // Cambio aquí
    sessionStorage.removeItem('categoriaUsuario'); // Cambio aquí
  }

  getToken(): string | null {
    return this.token || sessionStorage.getItem('token'); // Cambio aquí
  }

  private isTokenExpired(): boolean {
    const expiration = sessionStorage.getItem(this.tokenExpirationKey); // Cambio aquí
    if (!expiration) return true;
    return new Date(expiration) <= new Date();
  }

  obtenerCabeceraAutorizacion(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  private loadToken(): void {
    this.token = sessionStorage.getItem('token'); // Cambio aquí
  }

  getUserInfo(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    };

    // Hacer la solicitud GET al endpoint /me
    return this.http.get<any>(`${this.apiUrl}/me`, httpOptions);
  }

  updateProfile(updatedData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this.http.put<any>(`${this.apiUrl}/update`, updatedData, { headers });
  }

  updatePwd(datosPwd: any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this.http.put<any>(`${this.apiUrl}/updatePwd`, datosPwd, { headers });
  }

}
