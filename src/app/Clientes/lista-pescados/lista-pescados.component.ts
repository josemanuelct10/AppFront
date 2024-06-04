import { Component, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { IPescado } from '../../Interfaces/interfaces'; // Importa las interfaces necesarias

@Component({
  selector: 'app-lista-pescados',
  templateUrl: './lista-pescados.component.html',
  styleUrl: './lista-pescados.component.css' // Debería ser styleUrls, no styleUrl
})
export class ListaPescadosComponent implements OnInit  {

  pescados: any; // Almacena la lista de pescados
  categoriaSeleccionada: any = "todos"; // Almacena la categoría seleccionada, inicialmente 'todos'

  constructor(
    private pescadoService: PescadoServiceService // Servicio para obtener los pescados
  ){}

  ngOnInit(): void {
    // Obtener todos los pescados al inicializar el componente
    this.pescadoService.getAll().subscribe(
      data => {
        this.pescados = data; // Asignar los pescados obtenidos al arreglo de pescados
      }
    )
  }

  // Filtrar los pescados por categoría
  filtrarPescadosPorCategoria(): any[] {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === 'todos') {
      return this.pescados; // Si no se selecciona una categoría o se selecciona 'todos', devolver todos los pescados
    } else {
      // Filtrar los pescados por la categoría seleccionada
      return this.pescados.filter((pescado: IPescado) => pescado.categoria === this.categoriaSeleccionada);
    }
  }
}
