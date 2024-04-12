import { Component, Input } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';

@Component({
  selector: 'app-rm-proveedor',
  templateUrl: './rm-proveedor.component.html',
  styleUrl: './rm-proveedor.component.css'
})
export class RmProveedorComponent {
  @Input() id: any;
  @Input() nombre: any;

  constructor(
    private proveedorService: ProveedoresServiceService
  ){}

  eliminarProveedor(){
    this.proveedorService.rm(this.id).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
