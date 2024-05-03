import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VentasService } from '../../../Services/ventas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrl: './add-ventas.component.css'
})
export class AddVentasComponent{
  @Output() onChange = new EventEmitter<any>();


  descripcion: string;
  fecha: Date;
  referencia: string;
  cantidad: number;
  opciones: string[] = ['BAENA', 'DONA MENCIA'];
  seleccion: string;

  constructor(
    private ventasService: VentasService,
    private toast: ToastrService
  ){}


  guardarDatos(){


    if (this.seleccion == "BAENA"){
      this.referencia = "VEN-BAE-" + this.fecha;
    }
    else{
      this.referencia = "VEN_DOM-" + this.fecha;
    }

    console.log(this.referencia);

    const formData = {
      descripcion: this.descripcion,
      fecha: this.fecha,
      referencia: this.referencia,
      cantidad: this.cantidad
    }

    this.ventasService.add(formData).subscribe(
      data => {
        console.log(data);
        if (data.success == true){
          this.ventasService.getAll().subscribe(
            ventasActualizadas => {
              this.onChange.emit(ventasActualizadas);
              this.toast.success("Venta anadida correctamente.", "Success!");
            }
          )
        }
        else if (data.success === false && data.response == 0){
          this.toast.error("Ya ha creado una venta con esa venta con esa referencia hoy.", "Error!");
        }
      }
    )
  }
}
