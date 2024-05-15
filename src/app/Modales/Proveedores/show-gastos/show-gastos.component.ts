import { Component, Input, OnInit } from '@angular/core';
import { GastosServiceService } from '../../../Services/gastos-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-gastos',
  templateUrl: './show-gastos.component.html',
  styleUrl: './show-gastos.component.css'
})
export class ShowGastosComponent implements OnInit {

  ngOnInit(): void {
    console.log(this.proveedor);
  }

  @Input() proveedor: any;
  page: number;

  constructor(
    private gastosService: GastosServiceService,
    private toast: ToastrService
  ){}


  abrirDocumento(nombreArchivo: string){
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

}
