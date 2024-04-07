import { Component, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { MariscoServiceService } from '../../Services/marisco-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  pescados: any;
  mariscos: any;

  constructor(
    private pescadosService: PescadoServiceService,
    private mariscosService: MariscoServiceService
  ){}

  ngOnInit(): void {
    this.pescadosService.getAll().subscribe(data  => {
      this.pescados = data;
      console.log(this.pescados);
    });

    this.mariscosService.getAll().subscribe(data => {
      this.mariscos = data;
      console.log(this.mariscos);
    });
  }



}
