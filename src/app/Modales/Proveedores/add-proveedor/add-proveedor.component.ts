import { Component, EventEmitter, Output } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrl: './add-proveedor.component.css'
})
export class AddProveedorComponent {
  nombre: string;
  direccion: string;
  telefono: string;
  categoria: string;
  cif: string;

  @Output() onChange = new EventEmitter<any>();


  constructor(
    private proveedorService: ProveedoresServiceService,
    private toast: ToastrService,
  ){}


  guardarDatos(){
    const formData = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      categoria: this.categoria,
      cif: this.cif
    }

    this.proveedorService.add(formData).subscribe( data=> {
      if (data.success === true){
        this.proveedorService.getAll().subscribe(
          proveedores => {
            this.onChange.emit(proveedores);
            this.toast.success("Proveedor Añadido Correctamente.", "Success!");
          }
        )
      }
    });

    console.log(formData);
  }

}
