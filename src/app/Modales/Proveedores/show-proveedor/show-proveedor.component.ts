import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-proveedor',
  templateUrl: './show-proveedor.component.html',
  styleUrl: './show-proveedor.component.css'
})
export class ShowProveedorComponent {
  @Input() proveedor: any;

}
