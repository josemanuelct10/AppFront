import { EventEmitter, Injectable } from '@angular/core';
import { PescadoServiceService } from './pescado-service.service';
import { MariscoServiceService } from './marisco-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionLineasService {

  lineasActualizadas: EventEmitter<any> = new EventEmitter();

  lineas: any[] = [];

  apiUrl: string = 'http://127.0.0.1:8000/api/facturas/linea/create';


  constructor(
    private http: HttpClient
  ){}

  addLinea(linea: any){
    this.lineas.push(linea);
  }

  getLineas() {
    return this.lineas;
  }

  addLineaBD(data: any){
    return this.http.post<any>(this.apiUrl, data);
  }


}
