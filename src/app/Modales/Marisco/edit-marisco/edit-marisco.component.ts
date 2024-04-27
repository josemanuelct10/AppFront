import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-marisco',
  templateUrl: './edit-marisco.component.html',
  styleUrl: './edit-marisco.component.css'
})
export class EditMariscoComponent {
  @Input() marisco: any;
  @Output() onChange = new EventEmitter<any>();


  constructor(
    private mariscoService: MariscoServiceService,
    private toast: ToastrService
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

      if (data) {
        this.mariscoService.getAll().subscribe(
          mariscos => {
            this.onChange.emit(mariscos);
            this.toast.success('Marisco editado correctamente.', 'Success');
          }
        )
      } else {
        // Manejar el caso en el que 'success' no sea verdadero
        console.error('Error al editar el marisco:', data); // Otra acción de manejo de error
      }
    })

    console.log(formData);
  }

}
