import { Component, Input, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';

@Component({
  selector: 'app-edit-marisco',
  templateUrl: './edit-marisco.component.html',
  styleUrls: ['./edit-marisco.component.css']
})
export class EditMariscoComponent implements OnInit {
  @Input() marisco: any;
  proveedores: any;
  newMarisco: any = {
    ID: 0,
    NOMBRE: '',
    DESCRIPCION: '',
    ORIGEN: '',
    CANTIDAD: 0,
    PRECIO_KG: 0,
    FECHA_COMPRA: '',
    CATEGORIA: '',
    COCIDO: false,
    PROVEEDOR_ID: 0
  };

  constructor(
    private mariscoService: MariscoServiceService,
    private toast: ToastrService,
    public modal: NgbActiveModal,
    private proveedorService: ProveedoresServiceService
  ){}

  ngOnInit(): void {
    // Obtener la lista de proveedores
    this.proveedorService.getAll().subscribe(
      data => this.proveedores = data
    );

    // Asignar los valores del marisco al objeto newMarisco
    if (this.marisco) {
      this.newMarisco.ID = this.marisco.id;
      this.newMarisco.NOMBRE = this.marisco.nombre;
      this.newMarisco.DESCRIPCION = this.marisco.descripcion;
      this.newMarisco.ORIGEN = this.marisco.origen;
      this.newMarisco.CANTIDAD = this.marisco.cantidad;
      this.newMarisco.PRECIO_KG = this.marisco.precioKG;
      this.newMarisco.FECHA_COMPRA = this.marisco.fechaCompra;
      this.newMarisco.CATEGORIA = this.marisco.categoria;
      this.newMarisco.COCIDO = this.marisco.cocido;
      this.newMarisco.PROVEEDOR_ID = this.marisco.proveedor_id;
    }
  }

  guardarDatos(): void {
    const formData = {
      nombre: this.newMarisco.NOMBRE,
      descripcion: this.newMarisco.DESCRIPCION,
      origen: this.newMarisco.ORIGEN,
      precioKG: this.newMarisco.PRECIO_KG,
      cantidad: this.newMarisco.CANTIDAD,
      fechaCompra: this.newMarisco.FECHA_COMPRA,
      categoria: this.newMarisco.CATEGORIA,
      cocido: this.newMarisco.COCIDO
    };

    // Actualizar el marisco utilizando el servicio de mariscos
    this.mariscoService.update(this.marisco.id, formData).subscribe(data => {
      if (data) {
        // Si la actualización tiene éxito, obtener la lista actualizada de mariscos
        this.mariscoService.getAll().subscribe(mariscos => {
          // Cerrar el modal y emitir la lista de mariscos actualizada
          this.toast.success('Marisco editado correctamente.', 'Success');
          this.modal.close(mariscos);
        });
      } else {
        // Manejar el caso en el que 'success' no sea verdadero
        console.error('Error al editar el marisco:', data);
      }
    });
  }
}
