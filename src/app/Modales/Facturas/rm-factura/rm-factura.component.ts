import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacturasComponent } from '../../../Administrador/facturas/facturas.component';
import { ToastrService } from 'ngx-toastr';
import { FacturasService } from '../../../Services/facturas.service';

@Component({
  selector: 'app-rm-factura',
  templateUrl: './rm-factura.component.html',
  styleUrl: './rm-factura.component.css'
})
export class RmFacturaComponent {
  @Input() id: number;
  @Input() referencia: string;
  @Output() onChange = new EventEmitter<any>();

  constructor(
    private facturaService: FacturasService,
    private toast: ToastrService
  ){}

  eliminarFactura(){
    this.facturaService.rm(this.id).subscribe(
      result => {
        if (result.success === true){
          this.facturaService.getAll().subscribe(
            facturasActualizadas => {
              this.onChange.emit(facturasActualizadas);
              this.toast.success("Factura eliminada correctamente.", "Success!");
            }
          )
        }
        else{
          this.toast.error("Error al eliminar la factura seleccionada.", "Error!");
        }
      }
    )
  }

}
