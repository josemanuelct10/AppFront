import { Component, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { IMarisco, IPescado } from '../../Interfaces/interfaces'; // Importa las interfaces necesarias

@Component({
  selector: 'app-lista-marisco',
  templateUrl: './lista-marisco.component.html',
  styleUrl: './lista-marisco.component.css' // Debería ser styleUrls, no styleUrl
})
export class ListaMariscoComponent implements OnInit{

  productos: any; // Almacena la lista de mariscos
  categoriaSeleccionada: any = "todos"; // Almacena la categoría seleccionada, inicialmente 'todos'

  constructor (
    private mariscoService: MariscoServiceService // Servicio para obtener los mariscos
  ){}

  ngOnInit(): void {
    // Obtener todos los mariscos al inicializar el componente
    this.mariscoService.getAll().subscribe(
      data => {
        this.productos = data; // Asignar los mariscos obtenidos al arreglo de productos
      }
    )
  }

  // Filtrar los mariscos por categoría
  filtrarMariscosPorCategoria(): any[] {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === 'todos') {
      return this.productos; // Si no se selecciona una categoría o se selecciona 'todos', devolver todos los mariscos
    } else {
      // Filtrar los mariscos por la categoría seleccionada
      return this.productos.filter((marisco: IMarisco) => marisco.categoria === this.categoriaSeleccionada);
    }
  }
}
