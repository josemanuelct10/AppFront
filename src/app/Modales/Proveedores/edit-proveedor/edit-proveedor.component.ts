import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrl: './edit-proveedor.component.css'
})
export class EditProveedorComponent implements OnInit {

  // Propiedad de entrada para recibir los datos del proveedor desde el componente padre
  @Input() proveedor: any;

  // Propiedad local para almacenar los datos del proveedor que se está editando
  newProveedor: any = {
    ID: 0,
    NOMBRE: '',
    DIRECCION: '',
    CATEGORIA: '',
    TELEFONO: '',
    CIF: ''
  }

  // Inyectar los servicios necesarios para manejar los datos del proveedor, mostrar notificaciones y gestionar modales
  constructor(
    private proveedorService: ProveedoresServiceService,
    private toast: ToastrService,
    public modal: NgbActiveModal
  ){}

  // Hook del ciclo de vida que se llama después de que la vista del componente se haya inicializado por completo
  ngOnInit(): void {
    // Comprobar si los datos del proveedor existen, y si es así, copiar los datos al proveedor local
    if (this.proveedor){
      this.newProveedor.ID = this.proveedor.id,
      this.newProveedor.NOMBRE = this.proveedor.nombre,
      this.newProveedor.DIRECCION = this.proveedor.direccion,
      this.newProveedor.TELEFONO = this.proveedor.telefono,
      this.newProveedor.CATEGORIA = this.proveedor.categoria,
      this.newProveedor.CIF = this.proveedor.cif
    }
  }

  // Método para guardar los datos del proveedor
  guardarDatos(){
    // Preparar los datos del formulario para enviarlos en la solicitud de actualización
    const formData = {
      nombre: this.newProveedor.NOMBRE,
      direccion: this.newProveedor.DIRECCION,
      telefono: this.newProveedor.TELEFONO,
      categoria: this.newProveedor.CATEGORIA,
      cif: this.newProveedor.CIF,
    }

    // Llamar al método de actualización del servicio de proveedores con el ID del proveedor y los datos del formulario
    this.proveedorService.update(this.proveedor.id, formData).subscribe(
      (data: any) => {
        // Comprobar la respuesta del servidor
        if (data.response == 1){
          // Si es exitoso, obtener todos los proveedores, cerrar el modal y mostrar una notificación de éxito
          this.proveedorService.getAll().subscribe(
            proveedores => {
              this.modal.close(proveedores);
              this.toast.success("Proveedor actualizado correctamente.", "¡Éxito!");
            }
          )
        } else if(data.response == -2){
          // Si el CIF ya está en uso, mostrar una notificación de error y borrar el campo CIF
          this.toast.error("Ya existe un proveedor con ese CIF.", "¡Error!");
          this.newProveedor.CIF = '';
        } else if (data.response == -3){
          // Si el teléfono ya está en uso, mostrar una notificación de error y borrar el campo teléfono
          this.toast.error("Ya existe un proveedor con ese CIF.", "¡Error!");
          this.newProveedor.TELEFONO = '';
        }
      }
    )

    // Mostrar los datos del formulario en la consola para fines de depuración
    console.log(formData);
  }

  // Método para validar el formato del CIF
  validateCIFFormat(cif: string): boolean {
    const cifRegex = /^[A-Za-z]\d{8}$/;
    return cifRegex.test(cif);
  }

  // Método para validar el formato del teléfono
  validateTelefonoFormat(telefono: string): boolean {
    const telefonoRegex = /^\d{9}$/;
    return telefonoRegex.test(telefono);
  }
}
