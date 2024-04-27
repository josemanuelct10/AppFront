import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-pescado',
  templateUrl: './edit-pescado.component.html',
  styleUrl: './edit-pescado.component.css'
})
export class EditPescadoComponent {

  @Input() pescado: any;
  @Output() onChange = new EventEmitter<any>();

  pescados: any;

  constructor(
    private pescadoService: PescadoServiceService,
    private router: Router,
    private toast: ToastrService
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

      if (data){
        this.pescadoService.getAll().subscribe(
          pescados => {
            this.pescados = pescados;
            this.onChange.emit(this.pescados);
            this.toast.success("Pescado actualizado correctamente", "Success!");
          }
        )
      }
    })

    console.log(formData);
  }

}
