import { Component } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';

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

  constructor(
    private proveedorService: ProveedoresServiceService
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
      alert("Proveedor guardado correctamente.");
    });

    console.log(formData);
  }

}
