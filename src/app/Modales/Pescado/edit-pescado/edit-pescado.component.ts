import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { ToastrService } from 'ngx-toastr';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-pescado',
  templateUrl: './edit-pescado.component.html',
  styleUrls: ['./edit-pescado.component.css']
})
export class EditPescadoComponent implements OnInit {

  @ViewChild('formPescado') formPescado: NgForm; // Referencia al formulario NgForm

  @Input() pescado: any; // Pescado a editar

  proveedores: any; // Lista de proveedores
  pescados: any; // Lista de pescados

  newPescado: any = { // Objeto para almacenar los datos editados del pescado
    ID: 0,
    NOMBRE: '',
    DESCRIPCION: '',
    ORIGEN: '',
    CANTIDAD: 0,
    PRECIO_KG: 0,
    FECHA_COMPRA: '',
    CATEGORIA: '',
    PROVEEDOR_ID: 0
  };

  constructor(
    private pescadoService: PescadoServiceService,
    private toast: ToastrService,
    private proveedorService: ProveedoresServiceService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // Obtener la lista de proveedores al inicializar el componente
    this.proveedorService.getAll().subscribe(
      data => this.proveedores = data
    );

    // Inicializar los datos del pescado a editar
    if (this.pescado) {
      this.newPescado.ID = this.pescado.id;
      this.newPescado.NOMBRE = this.pescado.nombre;
      this.newPescado.DESCRIPCION = this.pescado.descripcion;
      this.newPescado.ORIGEN = this.pescado.origen;
      this.newPescado.CANTIDAD = this.pescado.cantidad;
      this.newPescado.PRECIO_KG = this.pescado.precioKG;
      this.newPescado.FECHA_COMPRA = this.pescado.fechaCompra;
      this.newPescado.CATEGORIA = this.pescado.categoria;
      this.newPescado.PROVEEDOR_ID = this.pescado.proveedor_id;
    }
  }

  guardarDatos(): void {
    // Crear un objeto formData con los datos editados del pescado
    const formData = {
      nombre: this.newPescado.NOMBRE,
      descripcion: this.newPescado.DESCRIPCION,
      origen: this.newPescado.ORIGEN,
      precioKG: this.newPescado.PRECIO_KG,
      cantidad: this.newPescado.CANTIDAD,
      fechaCompra: this.newPescado.FECHA_COMPRA,
      categoria: this.newPescado.CATEGORIA
    };

    // Llamar al servicio para actualizar los datos del pescado
    this.pescadoService.update(this.newPescado.ID, formData).subscribe(data => {
      if (data) {
        // Si la operación es exitosa, obtener la lista actualizada de pescados y cerrar el modal
        this.pescadoService.getAll().subscribe(
          pescados => {
            this.pescados = pescados;
            this.modal.close(this.pescados);
            this.toast.success('Pescado actualizado correctamente', 'Success!');
          }
        );
      }
    });
  }
}
