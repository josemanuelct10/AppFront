import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrl: './edit-proveedor.component.css'
})
export class EditProveedorComponent {

  @Input() proveedor: any;

}
