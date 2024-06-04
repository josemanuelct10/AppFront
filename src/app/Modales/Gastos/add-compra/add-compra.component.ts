import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service'; // Servicio para gestionar proveedores
import { GastosServiceService } from '../../../Services/gastos-service.service'; // Servicio para gestionar gastos
import { ToastrService } from 'ngx-toastr'; // Servicio Toastr para mostrar notificaciones
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Constructor de formularios y validadores
import { fileValidator } from '../../../Interfaces/Validaciones'; // Validador personalizado para archivos
import { v4 as uuidv4 } from 'uuid'; // Generador de UUID

@Component({
  selector: 'app-add-compra',
  templateUrl: './add-compra.component.html',
  styleUrls: ['./add-compra.component.css']
})
export class AddCompraComponent implements OnInit {

  @Output() onChange = new EventEmitter<any>(); // Evento para emitir cambios a otros componentes

  formCompra: FormGroup; // Formulario para agregar una compra

  constructor(
    private formBuilder: FormBuilder, // Constructor de formularios
    private proveedorService: ProveedoresServiceService, // Servicio para gestionar proveedores
    private gastosService: GastosServiceService, // Servicio para gestionar gastos
    private toast: ToastrService // Servicio Toastr para mostrar notificaciones
  ){
    // Construir el formulario de compra con validadores
    this.formCompra = formBuilder.group({
      descripcion: ['', Validators.required], // Descripción requerida
      cantidad: ['', [Validators.required, Validators.min(0.1)]], // Cantidad requerida y mayor que cero
      documento: [null, fileValidator()], // Archivo requerido y validado por el validador personalizado
      fecha: ['', Validators.required], // Fecha requerida
      proveedor_id: ['', Validators.required] // ID del proveedor requerido
    });
  }

  proveedores: any; // Lista de proveedores
  documento: File | null = null; // Archivo seleccionado

  // Método para manejar la selección de archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    this.documento = file; // Asignar el archivo seleccionado a la variable
    this.formCompra.patchValue({ documento: file }); // Actualizar el valor del formulario con el archivo
    this.formCompra.get('documento')?.updateValueAndValidity(); // Validar el campo de documento en el formulario
  }

  ngOnInit(): void {
    // Obtener la lista de proveedores al inicializar el componente
    this.proveedorService.getAll().subscribe(
      proveedores => {
        this.proveedores = proveedores; // Asignar la lista de proveedores a la variable
        console.log(this.proveedores); // Imprimir la lista de proveedores en la consola
      }
    );
  }

  // Método para guardar los datos de la compra
  guardarDatos(): void {
    const fechaString = this.formCompra.get('fecha')?.value.toString(); // Obtener la fecha como string

    if (this.documento) { // Verificar si se ha seleccionado un documento
      const reader = new FileReader(); // Crear un lector de archivos

      reader.onload = () => { // Callback cuando se completa la carga del archivo
        const documentoBase64 = reader.result as string; // Obtener el archivo en formato base64

        const formData = {
          proveedor_id: this.formCompra.get('proveedor_id')?.value, // ID del proveedor
          referencia: "COM-" + fechaString.replace(/-/g, '') + "-" + this.formCompra.get('proveedor_id')?.value + uuidv4(), // Referencia única usando UUID
          descripcion: this.formCompra.get('descripcion')?.value, // Descripción de la compra
          cantidad: this.formCompra.get('cantidad')?.value, // Cantidad de la compra
          documento: documentoBase64, // Documento en formato base64
          fecha: this.formCompra.get('fecha')?.value // Fecha de la compra
        };

        // Llamada al servicio para agregar la compra
        this.gastosService.add(formData).subscribe(
          data => {
            if (data.success === true) { // Verificar si la operación fue exitosa
              // Obtener todas las compras actualizadas
              this.gastosService.getAll().subscribe(
                datos => {
                  // Emitir el evento con las compras actualizadas
                  this.onChange.emit(datos);
                  // Mostrar una notificación de éxito
                  this.toast.success("Compra añadida correctamente.", "Success!");
                }
              );
            }
          },
          error => {
            // Mostrar una notificación de error en caso de fallo
            this.toast.error("Error al añadir la compra.", "Error!");
          }
        );
      };

      reader.readAsDataURL(this.documento); // Leer el archivo como un dato URL
    }
  }
}
