import { Component, Input } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';

@Component({
  selector: 'app-edit-marisco',
  templateUrl: './edit-marisco.component.html',
  styleUrl: './edit-marisco.component.css'
})
export class EditMariscoComponent {
  @Input() marisco: any;

  constructor(
    private mariscoService: MariscoServiceService
  ){}

  guardarDatos(){
    const formData = {
      nombre: this.marisco.nombre,
      descripcion: this.marisco.descripcion,
      origen: this.marisco.origen,
      precioKG: this.marisco.precioKG,
      cantidad: this.marisco.cantidad,
      fechaCompra: this.marisco.fechaCompra,
      categoria: this.marisco.categoria,
      cocido: this.marisco.cocido
    }

    this.mariscoService.update(this.marisco.id, formData).subscribe( data =>{
      alert("marisco actualizado correctamente.");
    })

    console.log(formData);
  }

}
