import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GastosServiceService } from '../../../Services/gastos-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-gasto',
  templateUrl: './rm-gasto.component.html',
  styleUrl: './rm-gasto.component.css'
})
export class RmGastoComponent {

  @Input() id: number;
  @Input() referencia: string;
  @Output() onChange = new EventEmitter<any>();

  constructor(
    private gastoService: GastosServiceService,
    private toast: ToastrService
  ){}


  eliminarGasto(){
    this.gastoService.rm(this.id).subscribe(
      result => {
        if (result.success === true){
          this.gastoService.getAll().subscribe(
            gastosActualizados => {
              this.onChange.emit(gastosActualizados);
              this.toast.success("Gasto eliminado correctamente.", "Success!");
            }
          )
        }
        else{
          this.toast.error("Error al eliminar el gasto seleccionado.", "Error!");
        }
      }
    )
  }

}
