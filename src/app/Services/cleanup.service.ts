import { Injectable } from '@angular/core';
import { InicioSesionService } from './inicio-sesion.service';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CleanupService {

  constructor(
    private inicioSesionService: InicioSesionService
  ){
    this.agregarEventListener();
  }

  agregarEventListener(): void {
    fromEvent(window, 'unload').subscribe(() => {
      this.inicioSesionService.limpiarToken();
    });
  }
}
