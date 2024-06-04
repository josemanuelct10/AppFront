import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { enviroment } from '../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  apiUrl: string = enviroment.apiUrl + '/api/user'; // URL base para las solicitudes al backend
  private token: string | null = null; // Token de autenticación del usuario
  private tokenExpirationKey = 'token_expiration'; // Clave para almacenar la expiración del token en el almacenamiento de sesión

  constructor(private http: HttpClient) {
    this.loadToken(); // Carga el token al inicializar el servicio
  }

  // Método para registrar un nuevo usuario
  registro(datosUsuario: any): Observable<any> {
    return this.http.post(this.apiUrl + '/create', datosUsuario);
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.guardarToken(response.token); // Guarda el token de autenticación en el almacenamiento de sesión
      }),
      catchError(error => {
        return throwError(error); // Maneja los errores de la solicitud
      })
    );
  }

  // Método para limpiar el token de autenticación y otros datos relacionados con la sesión
  limpiarToken(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem(this.tokenExpirationKey);
    this.token = null;
  }

  // Método para guardar el token de autenticación y su expiración en el almacenamiento de sesión
  private guardarToken(token: string): void {
    sessionStorage.setItem('token', token);
    const expiration = new Date(new Date().getTime() + 3600 * 1000); // Establece la expiración del token en 1 hora (ajustar según necesidad)
    sessionStorage.setItem(this.tokenExpirationKey, expiration.toISOString());
    this.token = token;
  }

  // Método para obtener la categoría de usuario
  getCategoriaUsuario() {
    return localStorage.getItem('categoriaUsuario');
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  // Método para cerrar sesión
  logout(): void {
    this.limpiarToken();
    sessionStorage.removeItem('idUsuario');
    sessionStorage.removeItem('categoriaUsuario');
  }

  // Método para obtener el token de autenticación
  getToken(): string | null {
    return this.token || sessionStorage.getItem('token');
  }

  // Método para verificar si el token de autenticación ha expirado
  private isTokenExpired(): boolean {
    const expiration = sessionStorage.getItem(this.tokenExpirationKey);
    if (!expiration) return true;
    return new Date(expiration) <= new Date();
  }

  // Método para obtener las cabeceras de autorización para las solicitudes HTTP
  obtenerCabeceraAutorizacion(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  // Método para cargar el token de autenticación al inicializar el servicio
  private loadToken(): void {
    this.token = sessionStorage.getItem('token');
  }

  // Método para obtener la información del usuario autenticado
  getUserInfo(): Observable<any> {
    const headers = this.obtenerCabeceraAutorizacion();
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }

  // Método para actualizar el perfil del usuario
  updateProfile(updatedData: any): Observable<any> {
    const headers = this.obtenerCabeceraAutorizacion();
    return this.http.put<any>(`${this.apiUrl}/update`, updatedData, { headers });
  }

  // Método para actualizar la contraseña del usuario
  updatePwd(datosPwd: any){
    const headers = this.obtenerCabeceraAutorizacion();
    return this.http.put<any>(`${this.apiUrl}/updatePwd`, datosPwd, { headers });
  }

  // Método para restablecer la contraseña del usuario
  resetPassword(data: any){
    return this.http.post<any>(`${this.apiUrl}/resetPwd`, data);
  }

  // Método para validar el token de restablecimiento de contraseña
  validateResetToken(data: any) {
    return this.http.post(`${this.apiUrl}/validate-reset-token`,  data );
  }

  // Método para cambiar la contraseña del usuario
  changePwd(data: any) {
    return this.http.post(`${this.apiUrl}/changePwd`, data);
  }
}
