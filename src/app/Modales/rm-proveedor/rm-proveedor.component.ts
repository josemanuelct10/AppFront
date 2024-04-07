import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rm-proveedor',
  templateUrl: './rm-proveedor.component.html',
  styleUrl: './rm-proveedor.component.css'
})
export class RmProveedorComponent {
  @Input() id: any;
  @Input() nombre: any;

}
