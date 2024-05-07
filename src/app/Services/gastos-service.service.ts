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

    const url = `${this.apiUrl}/document/${nombreArchivo}`;
    console.log(url);

    return this.http.get<Blob>(url, { responseType: 'blob' as 'json' });
  }

  rm(id: any){
    return this.http.delete<any>(`${this.apiUrl}/rm/${id}`);
  }

}
