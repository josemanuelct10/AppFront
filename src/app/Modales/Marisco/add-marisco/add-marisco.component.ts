import { Component } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';

@Component({
  selector: 'app-add-marisco',
  templateUrl: './add-marisco.component.html',
  styleUrl: './add-marisco.component.css'
})
export class AddMariscoComponent {
  nombre: string;
  descripcion: string;
  origen: string;
  precioKG: number;
  cantidad: number;
  fechaCompra: Date;
  categoria: string;
  cocido: boolean = false;

  constructor(private mariscoService: MariscoServiceService){}

  guardarDatos(){
    const formData = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      origen: this.origen,
      precioKG: this.precioKG,
      cantidad: this.cantidad,
      fechaCompra: this.fechaCompra,
      categoria: this.categoria,
      cocido: this.cocido
    }

    this.mariscoService.add(formData).subscribe( data=> {
      alert("Marisco guardado correctamente.");
    });

    console.log(formData);
  }
}
