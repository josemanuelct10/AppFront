import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-marisco',
  templateUrl: './rm-marisco.component.html',
  styleUrl: './rm-marisco.component.css'
})
export class RmMariscoComponent {
  @Input() id: number;
  @Input() nombre: string;
  @Output() onChange = new EventEmitter<any>();
  mariscos: any;

  constructor(
    private mariscoService: MariscoServiceService,
    private toast: ToastrService
  ){}

  eliminarMarisco(){
    this.mariscoService.rm(this.id).subscribe(
      data => {
        if (data.success === true){
          this.mariscoService.getAll().subscribe(data =>{
            this.mariscos = data;
            this.onChange.emit(this.mariscos);
            console.log(this.mariscos);

          });
        }
        console.log(data);
        this.toast.success("Marisco eliminado correctamente.");

      }
    )
  }

}
