import { Component, EventEmitter, Output } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.css']
})
export class AddProveedorComponent {

  formProveedor: FormGroup; // Formulario para agregar proveedor

  constructor(
    private formBuilder: FormBuilder,
    private proveedorService: ProveedoresServiceService,
    private toast: ToastrService,
    public modal: NgbActiveModal // Modal activo para este componente
  ){
    // Inicialización del formulario con validadores
    this.formProveedor = formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      categoria: ['', Validators.required],
      cif: ['', [Validators.required, Validators.pattern('^[A-Z][0-9]{8}$')]]
    })
  }

  // Método para guardar los datos del proveedor
  guardarDatos(){
    const formData = {
      nombre: this.formProveedor.get('nombre')?.value,
      direccion: this.formProveedor.get('direccion')?.value,
      telefono: this.formProveedor.get('telefono')?.value,
      categoria: this.formProveedor.get('categoria')?.value,
      cif: this.formProveedor.get('cif')?.value
    }

    // Llamada al servicio para agregar el proveedor
    this.proveedorService.add(formData).subscribe(
      data => {
        console.log(data);
        if (data.response === 1){
          // Si se agrega correctamente, obtener la lista actualizada de proveedores y cerrar el modal
          this.proveedorService.getAll().subscribe(
            proveedores => {
              this.modal.close(proveedores);
              this.toast.success("Proveedor Añadido Correctamente.", "Success!");
            }
          );
        }
        else if (data.response === -1){
          // Si ya existe un proveedor con ese CIF, mostrar un mensaje de error y resetear el campo CIF
          this.toast.error("Ya existe un proveedor con ese CIF.", "Error!");
          this.formProveedor.get('cif')?.reset();
        }
        else if (data.response === -2){
          // Si ya existe un proveedor con ese número de teléfono, mostrar un mensaje de error y resetear el campo de teléfono
          this.toast.error("Ya existe un proveedor con ese número de teléfono", "Error!");
          this.formProveedor.get('telefono')?.reset();
        }
      }
    );
  }
}
