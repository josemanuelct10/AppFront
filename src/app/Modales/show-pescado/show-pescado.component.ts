import { Component, Input, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../Services/pescado-service.service';

@Component({
  selector: 'app-show-pescado',
  templateUrl: './show-pescado.component.html',
  styleUrl: './show-pescado.component.css'
})
export class ShowPescadoComponent implements OnInit  {
  @Input() id: number;
  @Input() nombre: string;


  constructor(
    private pescadoService: PescadoServiceService
  ){}
  pescado: any;


  ngOnInit(): void {
    this.pescadoService.getById(this.id).subscribe(data=> {
      this.pescado = data;
      console.log(this.id, this.nombre);
    })
  }

  mostrar(){
    console.log(this.id, this.nombre);
  }

}
