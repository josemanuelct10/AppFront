import { Component, Input } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';

@Component({
  selector: 'app-rm-marisco',
  templateUrl: './rm-marisco.component.html',
  styleUrl: './rm-marisco.component.css'
})
export class RmMariscoComponent {
  @Input() id: number;
  @Input() nombre: string;

  constructor(private mariscoService: MariscoServiceService){}

  eliminarMarisco(){
    this.mariscoService.rm(this.id).subscribe(
      data => {
        console.log(data);
        alert("Marisco eliminado correctamente.");
      }
    )
  }

}
