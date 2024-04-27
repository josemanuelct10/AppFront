import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrl: './edit-proveedor.component.css'
})
export class EditProveedorComponent {

  @Input() proveedor: any;
  @Output() onChange = new EventEmitter<any>();

  constructor(
    private proveedorService: ProveedoresServiceService,
    private toast: ToastrService
  ){}

  guardarDatos(){
    const formData = {
      nombre: this.proveedor.nombre,
      direccion: this.proveedor.direccion,
      telefono: this.proveedor.telefono,
      categoria: this.proveedor.categoria,
      cif: this.proveedor.cif,
    }

    this.proveedorService.update(this.proveedor.id, formData).subscribe( data =>{
      if (data){
        this.proveedorService.getAll().subscribe(
          proveedores=>{
            this.onChange.emit(proveedores);
            this.toast.success("Proveedor actualizado correctamente.", "Success!");
          }
        )
      }
    })

    console.log(formData);
  }
}
