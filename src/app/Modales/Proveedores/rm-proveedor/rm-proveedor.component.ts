import { Component, Input } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-proveedor',
  templateUrl: './rm-proveedor.component.html',
  styleUrl: './rm-proveedor.component.css'
})
export class RmProveedorComponent {
  // Propiedades de entrada para recibir el ID y el nombre del proveedor desde el componente padre
  @Input() id: any;
  @Input() nombre: any;

  // Inyectar los servicios necesarios para manejar los datos del proveedor, mostrar notificaciones y gestionar modales
  constructor(
    private proveedorService: ProveedoresServiceService,
    public modal: NgbActiveModal,
    private toast: ToastrService
  ){}

  // Método para eliminar el proveedor
  eliminarProveedor(){
    // Llamar al método de eliminación del servicio de proveedores con el ID del proveedor
    this.proveedorService.rm(this.id).subscribe(
      data => {
        // Comprobar la respuesta del servidor
        if (data.response == 1){
          // Si es exitoso, obtener todos los proveedores y cerrar el modal
          this.proveedorService.getAll().subscribe(data => {
            this.modal.close(data);
          });
          // Mostrar una notificación de éxito
          this.toast.success("Proveedor eliminado correctamente.");
        }
      }
    )
  }
}

