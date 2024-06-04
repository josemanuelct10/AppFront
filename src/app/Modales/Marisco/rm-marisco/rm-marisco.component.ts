import { Component, Input } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rm-marisco',
  templateUrl: './rm-marisco.component.html',
  styleUrls: ['./rm-marisco.component.css']
})
export class RmMariscoComponent {
  @Input() id: number;
  @Input() nombre: string;

  constructor(
    private mariscoService: MariscoServiceService,
    private toast: ToastrService,
    public modal: NgbActiveModal
  ){}

  eliminarMarisco(): void {
    this.mariscoService.rm(this.id).subscribe(
      data => {
        if (data.success === true) {
          // Si la eliminación tiene éxito, obtener la lista actualizada de mariscos
          this.mariscoService.getAll().subscribe(data => {
            // Cerrar el modal y emitir la lista de mariscos actualizada
            this.modal.close(data);
          });
          // Mostrar una notificación de éxito
          this.toast.success("Marisco eliminado correctamente.");
        } else {
          // Mostrar una notificación de error si la eliminación no tiene éxito
          this.toast.error("Error al eliminar el marisco.");
        }
      },
      error => {
        // Mostrar una notificación de error si hay algún error en la solicitud
        this.toast.error("Error al eliminar el marisco.");
        console.error("Error al eliminar el marisco:", error);
      }
    );
  }
}
