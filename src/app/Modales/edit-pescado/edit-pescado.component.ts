import { Component, Input } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-pescado',
  templateUrl: './edit-pescado.component.html',
  styleUrl: './edit-pescado.component.css'
})
export class EditPescadoComponent {

  @Input() pescado: any;

  constructor(
    private pescadoService: PescadoServiceService,
    private router: Router
  ) {}



  guardarDatos(){
    const formData = {
      nombre: this.pescado.nombre,
      descripcion: this.pescado.descripcion,
      origen: this.pescado.origen,
      precioKG: this.pescado.precioKG,
      cantidad: this.pescado.cantidad,
      fechaCompra: this.pescado.fechaCompra,
      categoria: this.pescado.categoria
    }

    this.pescadoService.update(this.pescado.id, formData).subscribe( data =>{
      alert("Pescado actualizado correctamente.");
    })

    console.log(formData);
  }

}
