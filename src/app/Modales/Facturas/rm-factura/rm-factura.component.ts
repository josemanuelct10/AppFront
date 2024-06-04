import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacturasComponent } from '../../../Administrador/facturas/facturas.component'; // ¿Este import se usa en este archivo?
import { ToastrService } from 'ngx-toastr'; // Importación del servicio Toastr para mostrar mensajes
import { FacturasService } from '../../../Services/facturas.service'; // Importación del servicio de facturas
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rm-factura',
  templateUrl: './rm-factura.component.html',
  styleUrls: ['./rm-factura.component.css']
})
export class RmFacturaComponent {
  @Input() factura: any;

  constructor(
    private facturaService: FacturasService, // Servicio para gestionar facturas
    private toast: ToastrService, // Servicio Toastr para mostrar notificaciones,
    public modal: NgbActiveModal
  ){}

  eliminarFactura(){
    // Método para eliminar una factura

    // Llamada al servicio para eliminar la factura por su ID
    this.facturaService.rm(this.factura.id).subscribe(
      result => {
        // Manejar el resultado de la llamada

        // Comprobar si la eliminación fue exitosa
        if (result.success === true){
          // Si fue exitosa, obtener las facturas actualizadas
          this.facturaService.getAll().subscribe(
            (facturasActualizadas: any) => {
              // Emitir el evento con las facturas actualizadas
              this.modal.close(facturasActualizadas.data);
              // Mostrar una notificación de éxito
              this.toast.success("Factura eliminada correctamente.", "Success!");
            }
          )
        }
        else{
          // Si hubo un error al eliminar la factura, mostrar una notificación de error
          this.toast.error("Error al eliminar la factura seleccionada.", "Error!");
        }
      }
    )
  }
}
