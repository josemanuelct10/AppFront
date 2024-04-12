import { Component, Input, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';

@Component({
  selector: 'app-rm-pescado',
  templateUrl: './rm-pescado.component.html',
  styleUrl: './rm-pescado.component.css'
})
export class RmPescadoComponent   {

  @Input() id: number;
  @Input() nombre: string;

  constructor(
    private pescadoService: PescadoServiceService
  ){
  }

  eliminarPescado(){
    this.pescadoService.rm(this.id).subscribe(
      data => {
        console.log(data);
      }
    )
  }



}
