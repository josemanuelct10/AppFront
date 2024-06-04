import { Component, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { forkJoin } from 'rxjs'; // Importa la función forkJoin para combinar múltiples observables

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: any; // Almacena la lista combinada de pescados y mariscos

  constructor(
    private pescadosService: PescadoServiceService, // Servicio para obtener pescados
    private mariscosService: MariscoServiceService // Servicio para obtener mariscos
  ) {}

  ngOnInit(): void {
    // Utiliza forkJoin para combinar las llamadas a los servicios y obtener ambos conjuntos de datos simultáneamente
    forkJoin([
      this.pescadosService.getAll(), // Obtener todos los pescados
      this.mariscosService.getAll() // Obtener todos los mariscos
    ]).subscribe(
      ([pescados, mariscos]) => {
        // Almacena los pescados en la lista de productos
        this.productos = pescados;

        // Verifica si los mariscos son un array
        if (Array.isArray(mariscos)) {
          // Si es un array, agrega los mariscos a la lista de productos
          this.productos.push(...mariscos);
        }
      },
      error => {
        // Maneja cualquier error que ocurra al obtener los datos
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}
