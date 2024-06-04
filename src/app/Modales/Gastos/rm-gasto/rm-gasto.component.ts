import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GastosServiceService } from '../../../Services/gastos-service.service'; // Servicio para gestionar los gastos
import { ToastrService } from 'ngx-toastr'; // Servicio Toastr para mostrar notificaciones

@Component({
  selector: 'app-rm-gasto',
  templateUrl: './rm-gasto.component.html',
  styleUrls: ['./rm-gasto.component.css']
})
export class RmGastoComponent {

  @Input() id: number; // Identificación del gasto que se va a eliminar
  @Input() referencia: string; // Referencia del gasto que se va a eliminar
  @Output() onChange = new EventEmitter<any>(); // Evento para emitir cambios después de eliminar un gasto

  constructor(
    private gastoService: GastosServiceService, // Servicio para gestionar los gastos
    private toast: ToastrService // Servicio Toastr para mostrar notificaciones
  ){}

  // Método para eliminar un gasto
  eliminarGasto(){
    this.gastoService.rm(this.id).subscribe( // Llamar al método de servicio para eliminar el gasto
      result => {
        if (result.success === true){ // Si la eliminación fue exitosa
          this.gastoService.getAll().subscribe( // Obtener todos los gastos actualizados
            gastosActualizados => {
              this.onChange.emit(gastosActualizados); // Emitir el evento con los gastos actualizados
              this.toast.success("Gasto eliminado correctamente.", "Success!"); // Mostrar una notificación de éxito
            }
          )
        }
        else{ // Si la eliminación falló
          this.toast.error("Error al eliminar el gasto seleccionado.", "Error!"); // Mostrar una notificación de error
        }
      }
    )
  }

}
