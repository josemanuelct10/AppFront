import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VentasService } from '../../../Services/ventas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-ventas',
  templateUrl: './rm-ventas.component.html',
  styleUrl: './rm-ventas.component.css'
})
export class RmVentasComponent {

  @Input() id: number;
  @Input() referencia: string;
  @Output() onChange = new EventEmitter<any>();

  constructor(
    private ventaService: VentasService,
    private toast: ToastrService
  ){}

  eliminarVenta(){
    this.ventaService.rm(this.id).subscribe(
      result => {
        if (result.response == 1){
          this.ventaService.getAll().subscribe(
            ventasActualizadas => {
              this.onChange.emit(ventasActualizadas);
              this.toast.success("Venta eliminada correctamente.", "Success!");
            }
          )
        }
        else this.toast.error("Se ha producido un error al eliminar la venta.", "Error!");
      }
    )
  }

}
