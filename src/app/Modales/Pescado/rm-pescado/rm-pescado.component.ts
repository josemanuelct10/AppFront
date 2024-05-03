import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-pescado',
  templateUrl: './rm-pescado.component.html',
  styleUrl: './rm-pescado.component.css'
})
export class RmPescadoComponent   {

  @Input() id: number;
  @Input() nombre: string;
  @Output() onChange = new EventEmitter<any>();

  pescados: any;

  constructor(
    private pescadoService: PescadoServiceService,
    private toast: ToastrService
  ){
  }

  eliminarPescado(){
    this.pescadoService.rm(this.id).subscribe(
      data => {
        if (data.success === true){
          this.pescadoService.getAll().subscribe(
            data => {
              this.pescados = data;
              console.log(this.pescados);
              this.onChange.emit(this.pescados);

            });
        }
        this.toast.success("Pescado eliminado correctamente.");

        console.log(data);
      }
    )
  }
}
