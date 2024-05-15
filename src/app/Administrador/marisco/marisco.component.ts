import { Component, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { ToastrService } from 'ngx-toastr';

export interface Marisco {
  id: number;
  // Otros campos del objeto marisco
}

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
  page: number;

  constructor(
    private mariscoService: MariscoServiceService,
    private toast: ToastrService
  ){
    this.mariscoService.getAll().subscribe(data  => {
      this.mariscos = data;
      console.log(this.mariscos);
    });
  }


  actualizarMariscos(mariscosActualizados: any){
    this.mariscos = mariscosActualizados;
  }

  ngOnInit(): void {

  }

  onMariscoEliminado(id: number){
    this.mariscos = this.mariscos.filter((marisco: any) => marisco.id !== id);
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
