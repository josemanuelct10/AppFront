import { Component, OnDestroy, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pescado',
  templateUrl: './pescado.component.html',
  styleUrl: './pescado.component.css'
})
export class PescadoComponent implements OnInit, OnDestroy {
  pescados: any[] = [];
  private datosActualizadosSubscription: Subscription;

  constructor(
    private pescadosService: PescadoServiceService
  ) {}

  ngOnDestroy(): void {
    // Desuscribirse de las suscripciones para evitar fugas de memoria
    this.datosActualizadosSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.actualizarDatos();
    this.datosActualizadosSubscription = this.pescadosService.getAll().subscribe((data: any) => {
      this.actualizarDatos();
    });
  }

  actualizarPagina(): void {
    window.location.reload();
  }

  actualizarDatos(): void {
    this.datosActualizadosSubscription = this.pescadosService.getAll().subscribe((data: any) => {
      this.pescados = data;
    });
  }

  id: any;
  nombre: string;

  setPescadoAEliminar(id: any, nombre: any): void {
    this.id = id;
    this.nombre = nombre;
  }


}
