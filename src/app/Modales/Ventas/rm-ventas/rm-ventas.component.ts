import { Component, EventEmitter, Input, Output } from '@angular/core'; // Importa componentes y decoradores de Angular
import { VentasService } from '../../../Services/ventas.service'; // Importa el servicio para manejar las ventas
import { ToastrService } from 'ngx-toastr'; // Importa el servicio Toastr para notificaciones

@Component({
  selector: 'app-rm-ventas', // Selector del componente
  templateUrl: './rm-ventas.component.html', // Ruta de la plantilla HTML asociada al componente
  styleUrls: ['./rm-ventas.component.css'] // Ruta de los estilos CSS asociados al componente
})
export class RmVentasComponent {

  @Input() id: number; // Propiedad de entrada que recibe el ID de la venta a eliminar
  @Input() referencia: string; // Propiedad de entrada que recibe la referencia de la venta a eliminar
  @Output() onChange = new EventEmitter<any>(); // Evento de salida que emite los cambios después de eliminar la venta

  constructor(
    private ventaService: VentasService, // Servicio para manejar las ventas
    private toast: ToastrService // Servicio Toastr para notificaciones
  ){}

  // Método para eliminar la venta
  eliminarVenta(){
    // Llama al método del servicio para eliminar la venta por su ID
    this.ventaService.rm(this.id).subscribe(
      result => {
        // Si la eliminación es exitosa
        if (result.response == 1){
          // Recarga todas las ventas después de eliminar y emite los cambios
          this.ventaService.getAll().subscribe(
            ventasActualizadas => {
              this.onChange.emit(ventasActualizadas);
              this.toast.success("Venta eliminada correctamente.", "Success!"); // Muestra una notificación de éxito
            }
          )
        }
        else this.toast.error("Se ha producido un error al eliminar la venta.", "Error!"); // Si hay un error en la eliminación, muestra una notificación de error
      }
    )
  }

}
