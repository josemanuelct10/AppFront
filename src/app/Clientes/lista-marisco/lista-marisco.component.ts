import { Component, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { IMarisco, IPescado } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-lista-marisco',
  templateUrl: './lista-marisco.component.html',
  styleUrl: './lista-marisco.component.css'
})
export class ListaMariscoComponent implements OnInit{

  productos: any;
  categoriaSeleccionada: any = "todos";

  constructor (
    private mariscoService: MariscoServiceService
  ){}


  ngOnInit(): void {
    this.mariscoService.getAll().subscribe(
      data => {
        this.productos = data;
      }
    )
  }

  filtrarMariscosPorCategoria(): any[] {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === 'todos') {
      return this.productos; // Si no se selecciona una categoría o se selecciona 'todas', devolver todos los pescados
    } else {
      return this.productos.filter((marisco: IMarisco) => marisco.categoria === this.categoriaSeleccionada);
    }
  }

}
