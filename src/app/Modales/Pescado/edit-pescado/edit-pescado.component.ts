import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';

@Component({
  selector: 'app-edit-pescado',
  templateUrl: './edit-pescado.component.html',
  styleUrl: './edit-pescado.component.css'
})
export class EditPescadoComponent implements OnInit {

  @Input() pescado: any;
  @Output() onChange = new EventEmitter<any>();

  proveedores: any;

  pescados: any;

  constructor(
    private pescadoService: PescadoServiceService,
    private toast: ToastrService,
    private proveedorService: ProveedoresServiceService
  ) {}


  ngOnInit(): void {
    this.proveedorService.getAll().subscribe(
      data => this.proveedores = data
    )
  }



  guardarDatos(){
    const formData = {
      nombre: this.pescado.nombre,
      descripcion: this.pescado.descripcion,
      origen: this.pescado.origen,
      precioKG: this.pescado.precioKG,
      cantidad: this.pescado.cantidad,
      fechaCompra: this.pescado.fechaCompra,
      categoria: this.pescado.categoria
    }

    this.pescadoService.update(this.pescado.id, formData).subscribe( data =>{

      if (data){
        this.pescadoService.getAll().subscribe(
          pescados => {
            this.pescados = pescados;
            this.onChange.emit(this.pescados);
            this.toast.success("Pescado actualizado correctamente", "Success!");
          }
        )
      }
    })
  }

}
