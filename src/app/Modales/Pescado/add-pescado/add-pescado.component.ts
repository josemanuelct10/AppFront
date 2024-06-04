import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-pescado',
  templateUrl: './add-pescado.component.html',
  styleUrls: ['./add-pescado.component.css']
})
export class AddPescadoComponent {

  formularioPescado: FormGroup; // Formulario para agregar un nuevo pescado
  pescados: any; // Lista de pescados
  imagen: any; // Imagen seleccionada
  user_id = localStorage.getItem('idUsuario'); // ID del usuario almacenado localmente
  proveedores: any; // Lista de proveedores

  constructor(
    private formBuilder: FormBuilder,
    private pescadoService: PescadoServiceService,
    private proveedorService: ProveedoresServiceService,
    private toastr: ToastrService,
    public modal: NgbActiveModal
  ) {
    // Obtener la lista de proveedores al iniciar el componente
    this.proveedorService.getAll().subscribe(
      data => {
        this.proveedores = data;
      }
    );
    // Inicializar el formulario de pescado con validadores
    this.formularioPescado = formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      origen: ['', Validators.required],
      precioKG: ['', [Validators.required, Validators.min(0.01)]],
      cantidad: ['', [Validators.required, Validators.min(0.01)]],
      fechaCompra: ['', Validators.required],
      categoria: ['', Validators.required],
      proveedor_id: ['', Validators.required]
    });
  }

  // Capturar la imagen seleccionada por el usuario
  capturarImagen(event: any): void {
    this.imagen = event.target.files[0];
  }

  // Método para guardar los datos del nuevo pescado
  guardarDatos(): void {
    const formData = new FormData();
    formData.append('nombre', this.formularioPescado.get('nombre')?.value);
    formData.append('descripcion', this.formularioPescado.get('descripcion')?.value);
    formData.append('origen', this.formularioPescado.get('origen')?.value);
    formData.append('precioKG', this.formularioPescado.get('precioKG')?.value);
    formData.append('cantidad', this.formularioPescado.get('cantidad')?.value);
    if (this.formularioPescado.get('fechaCompra')?.value instanceof Date) {
      formData.append('fechaCompra', this.formularioPescado.get('fechaCompra')?.value.toISOString());
    }
    formData.append('categoria', this.formularioPescado.get('categoria')?.value);
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }
    if (this.user_id) {
      formData.append('user_id', this.user_id);
    }
    formData.append('proveedor_id', this.formularioPescado.get('proveedor_id')?.value.toString());

    // Llamar al servicio para agregar un nuevo pescado
    this.pescadoService.add(formData).subscribe(
      data => {
        if (data.success === true){
          // Si la operación es exitosa, mostrar un mensaje de éxito y cerrar el modal
          this.toastr.success("Pescado añadido correctamente", "Success!");
          this.pescadoService.getAll().subscribe(
            data =>{
              this.pescados = data;
              this.modal.close(this.pescados);
            }
          );
        } else {
          // Si hay un error, mostrar un mensaje de error
          this.toastr.error("Ha ocurrido un error al crearse el pescado.", "Error!");
        }
      },
      error => {
        // Manejar errores de la solicitud HTTP
        this.toastr.error("Ocurrió un error al añadir el pescado", "Error");
        console.error("Error al añadir el pescado:", error);
      }
    );
  }
}
