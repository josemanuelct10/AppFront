import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-pescado',
  templateUrl: './add-pescado.component.html',
  styleUrl: './add-pescado.component.css'
})
export class AddPescadoComponent {




  constructor(
    private pescadoService: PescadoServiceService,
    private router: Router
  ) {}

  nombre: string;
  descripcion: string;
  origen: string;
  precioKG: number;
  cantidad: number;
  fechaCompra: Date;
  categoria: string;
  // imagen: string;


  guardarDatos(){
    const formData = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      origen: this.origen,
      precioKG: this.precioKG,
      cantidad: this.cantidad,
      fechaCompra: this.fechaCompra,
      categoria: this.categoria
    }

    this.pescadoService.add(formData).subscribe( data=> {
      alert("Pescado guardado correctamente.");
      this.pescadoService.notificarActualizacion();
    });

    console.log(formData);
  }
}
