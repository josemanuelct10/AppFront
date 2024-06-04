import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-proveedor',
  templateUrl: './show-proveedor.component.html',
  styleUrl: './show-proveedor.component.css'
})
export class ShowProveedorComponent {
  @Input() proveedor: any;

  constructor(
    public modal: NgbActiveModal
  ){}

}
