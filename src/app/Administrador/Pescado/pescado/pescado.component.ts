import { Component, OnDestroy, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pescado',
  templateUrl: './pescado.component.html',
  styleUrl: './pescado.component.css'
})
export class PescadoComponent implements OnInit {
  pescados: any;
  pescado: any;
  id: any;
  nombre: string;

  constructor(
    private pescadosService: PescadoServiceService
  ) {}


  actualizarPescados(pescadosActualizados: any){
    this.pescados = pescadosActualizados;
  }


  ngOnInit(): void {
    this.pescadosService.getAll().subscribe(data  => {
      this.pescados = data;
      console.log(this.pescados);
    });
  }

  setPescadoAEliminar(id: any, nombre: any): void {
    this.id = id;
    this.nombre = nombre;
  }

  buscarPescado(id: any){
    this.pescadosService.getById(id).subscribe(data=> {
      this.pescado = data;
      console.log(this.pescado);
      console.log(id, "aaaa");
    })
  }
}
