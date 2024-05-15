import { Component, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: any;

  constructor(
    private pescadosService: PescadoServiceService,
    private mariscosService: MariscoServiceService
  ) {}

  ngOnInit(): void {
    this.pescadosService.getAll().subscribe(
      pescados => {
        this.productos = pescados;
        this.mariscosService.getAll().subscribe(
          mariscos => {
            if (Array.isArray(mariscos)) { // Verificar si mariscos es un array
              this.productos.push(...mariscos); // Agregar los mariscos al array productos
            }
          },
          error => {
            console.error('Error al obtener los mariscos:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener los pescados:', error);
      }
    );
  }

}
