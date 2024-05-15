import { Component, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { IPescado } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-lista-pescados',
  templateUrl: './lista-pescados.component.html',
  styleUrl: './lista-pescados.component.css'
})
export class ListaPescadosComponent implements OnInit  {

  pescados: any;
  categoriaSeleccionada: any = "todos";

  constructor(
    private pescadoService: PescadoServiceService
  ){}

  ngOnInit(): void {
    this.pescadoService.getAll().subscribe(
      data => {
        this.pescados = data;
      }
    )
  }

  filtrarPescadosPorCategoria(): any[] {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === 'todos') {
      return this.pescados; // Si no se selecciona una categoría o se selecciona 'todas', devolver todos los pescados
    } else {
      return this.pescados.filter((pescado: IPescado) => pescado.categoria === this.categoriaSeleccionada);
    }
  }




}
