import { Component, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../Services/marisco-service.service';

@Component({
  selector: 'app-marisco',
  templateUrl: './marisco.component.html',
  styleUrl: './marisco.component.css'
})
export class MariscoComponent implements OnInit {

  mariscos: any;
  marisco: any;
  id: any;
  nombre: string;

  constructor(private mariscoService: MariscoServiceService){

  }


  ngOnInit(): void {
    this.mariscoService.getAll().subscribe(data  => {
      this.mariscos = data;
      console.log(this.mariscos);
    });
  }


  buscarMarisco(id: any){
    this.mariscoService.getById(id).subscribe(data=> {
      this.marisco = data;
      console.log(this.marisco);
      console.log(id, "aaaa");
    })
  }

  setMariscoAEliminar(id:any, nombre: any){
    this.id = id;
    this.nombre = nombre;
  }
}