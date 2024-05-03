import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GastosServiceService {

  apiUrl: string = 'http://127.0.0.1:8000/api/gastos';

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get(this.apiUrl + '/show')
  }

  add(data: any){
    const headers = new HttpHeaders();
    // Establecer el encabezado Content-Type como multipart/form-data
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl + '/create', data, {headers: headers});
  }

  getDocumento(nombreArchivo: string){

    const url = `${this.apiUrl}/${nombreArchivo}`;
    console.log(url);

    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf', // Indicamos que esperamos un PDF
      'Accept': 'application/pdf' // Indicamos que aceptamos un PDF como respuesta
    });

    return this.http.get(url, {responseType: 'blob', headers: headers});
  }

  rm(id: any){
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`);
  }

}
