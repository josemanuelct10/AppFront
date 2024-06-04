import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rm-pescado',
  templateUrl: './rm-pescado.component.html',
  styleUrls: ['./rm-pescado.component.css']
})
export class RmPescadoComponent   {

  @Input() id: number; // Entrada: ID del pescado a eliminar
  @Input() nombre: string; // Entrada: Nombre del pescado a eliminar

  pescados: any; // Lista de pescados

  constructor(
    private pescadoService: PescadoServiceService,
    private toast: ToastrService,
    public modal: NgbActiveModal
  ){
  }

  eliminarPescado(){
    // Llamar al servicio para eliminar el pescado por su ID
    this.pescadoService.rm(this.id).subscribe(
      data => {
        if (data.success === true){
          // Si la eliminación es exitosa, obtener la lista actualizada de pescados y cerrar el modal
          this.pescadoService.getAll().subscribe(
            data => {
              this.pescados = data;
              console.log(this.pescados);
              this.modal.close(this.pescados);
            });
        }
        this.toast.success("Pescado eliminado correctamente."); // Mostrar mensaje de éxito
        console.log(data); // Imprimir datos de la respuesta en la consola
      }
    )
  }
}
