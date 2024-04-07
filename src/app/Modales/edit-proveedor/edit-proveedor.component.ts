import { Component, Input } from '@angular/core';
import { ProveedoresServiceService } from '../../Services/proveedores-service.service';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrl: './edit-proveedor.component.css'
})
export class EditProveedorComponent {

  @Input() proveedor: any;

  constructor(
    private proveedorService: ProveedoresServiceService
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
      alert("Proveedor actualizado correctamente.");
    })

    console.log(formData);
  }
}
