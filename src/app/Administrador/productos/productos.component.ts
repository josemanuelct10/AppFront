import { Component, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { MariscoServiceService } from '../../Services/marisco-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class ProductosComponent implements OnInit {

  pescados: any; // Variable para almacenar los pescados
  mariscos: any; // Variable para almacenar los mariscos

  constructor(
    private pescadosService: PescadoServiceService, // Servicio para gestionar los pescados
    private mariscosService: MariscoServiceService // Servicio para gestionar los mariscos
  ){}

  ngOnInit(): void {
    // Obtener todos los pescados
    this.pescadosService.getAll().subscribe(data  => {
      this.pescados = data; // Asignar los pescados obtenidos a la variable pescados
      console.log(this.pescados);
    });

    // Obtener todos los mariscos
    this.mariscosService.getAll().subscribe(data => {
      this.mariscos = data; // Asignar los mariscos obtenidos a la variable mariscos
      console.log(this.mariscos);
    });
  }
}
