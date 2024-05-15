import { Component, Input, OnInit } from '@angular/core';
import { GastosServiceService } from '../../../Services/gastos-service.service';
import { ToastrService } from 'ngx-toastr';
import { FacturasService } from '../../../Services/facturas.service';

@Component({
  selector: 'app-show-nominas',
  templateUrl: './show-nominas.component.html',
  styleUrl: './show-nominas.component.css'
})
export class ShowNominasComponent implements OnInit {
  @Input() usuario: any;
  page: number;

  ngOnInit(): void {
    console.log(">>>>>>>",this.usuario);
  }

  constructor(
    private gastosService: GastosServiceService,
    private facturasService: FacturasService,
    private toast: ToastrService
  ){}


  abrirDocumento(nombreArchivo: string, id: number){

    if (this.usuario.categoria_usuario_id == 1 || this.usuario.categoria_usuario_id == 3){
      this.gastosService.getDocumento(nombreArchivo).subscribe(
        (documento: Blob) => {
          const url = window.URL.createObjectURL(documento);

          window.open(url);

        },
        (error) => {
          this.toast.error("Error al abrir el documento.", "Error!");
        }
      )
    }
    else if(this.usuario.categoria_usuario_id == 2){
      this.facturasService.getDocumento(id).subscribe(
        (documento: Blob) => {
          const url = window.URL.createObjectURL(documento);

          window.open(url);


        },
        (error) => {
          this.toast.error("Error al abrir el documento.", "Error!");
        }
      )
    }

  }

}
