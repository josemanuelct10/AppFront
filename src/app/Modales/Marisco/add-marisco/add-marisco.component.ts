import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service'; // Servicio para gestionar los mariscos
import { ToastrService } from 'ngx-toastr'; // Servicio Toastr para mostrar notificaciones
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service'; // Servicio para obtener proveedores
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importación para manejar formularios reactivos

@Component({
  selector: 'app-add-marisco',
  templateUrl: './add-marisco.component.html',
  styleUrls: ['./add-marisco.component.css']
})
export class AddMariscoComponent {

  mariscos: any; // Variable para almacenar los mariscos
  @Output() onChange = new EventEmitter<any>(); // Evento para emitir cambios después de agregar un marisco

  formularioMarisco: FormGroup; // FormGroup para manejar el formulario de agregar marisco

  categoria: string; // Variable para almacenar la categoría del marisco
  imagen: string | null = null; // Variable para almacenar la imagen seleccionada, inicializada como nula por defecto
  user_id = localStorage.getItem('idUsuario'); // Obtener el ID de usuario del almacenamiento local
  proveedor_id: number = 0; // ID del proveedor, inicializado con 0 por defecto

  proveedores: any; // Variable para almacenar los proveedores

  // Método para capturar la imagen seleccionada
  capturarImagen(event: any): void {
    this.imagen = event.target.files[0]; // Obtener la imagen seleccionada
    console.log(event.target.files);
  }

  constructor(
    private formBuilder: FormBuilder,
    private mariscoService: MariscoServiceService,
    private toast: ToastrService,
    private proveedorService: ProveedoresServiceService
  ){
    // Obtener todos los proveedores al iniciar el componente
    this.proveedorService.getAll().subscribe(
      data => {
        this.proveedores = data; // Asignar los proveedores obtenidos a la variable de clase
        console.log(this.proveedores);
      }
    );

    // Inicializar el formulario reactivo para agregar mariscos con validaciones
    this.formularioMarisco = formBuilder.group({
      nombre: ['', Validators.required], // Campo para el nombre del marisco, requerido
      descripcion: ['', Validators.required], // Campo para la descripción del marisco, requerido
      origen: ['', Validators.required], // Campo para el origen del marisco, requerido
      precioKG: ['', [Validators.required, Validators.min(0.01)]], // Campo para el precio por kilogramo del marisco, requerido y debe ser mayor que 0.01
      cantidad: ['', [Validators.required, Validators.min(0.01)]], // Campo para la cantidad del marisco, requerido y debe ser mayor que 0.01
      cocido: [], // Campo para indicar si el marisco está cocido o no
      fechaCompra: ['', Validators.required], // Campo para la fecha de compra del marisco, requerido
      categoria: ['', Validators.required], // Campo para la categoría del marisco, requerido
      proveedor_id: ['', Validators.required] // Campo para el ID del proveedor del marisco, requerido
    });
  }

  // Método para guardar los datos del marisco
  guardarDatos(){
    // Crear un FormData para enviar los datos del formulario
    const formData = new FormData();

    // Agregar los campos del formulario al FormData
    formData.append('nombre', this.formularioMarisco.get('nombre')?.value);
    formData.append('descripcion', this.formularioMarisco.get('descripcion')?.value);
    formData.append('origen', this.formularioMarisco.get('origen')?.value);
    formData.append('precioKG', this.formularioMarisco.get('precioKG')?.value);
    formData.append('cantidad', this.formularioMarisco.get('cantidad')?.value);
    formData.append('categoria', this.categoria);

    // Obtener el valor del campo cocido y convertirlo a un valor numérico (0 o 1)
    const cocidoValue = this.formularioMarisco.get('cocido')?.value ? 1 : 0;
    formData.append('cocido', cocidoValue.toString());

    // Convertir la fecha de compra a formato ISOString y agregarla al FormData
    if (this.formularioMarisco.get('fechaCompra')?.value instanceof Date) {
      formData.append('fechaCompra', this.formularioMarisco.get('fechaCompra')?.value.toISOString());
    }

    // Agregar la imagen al FormData si está presente
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }

    // Obtener el ID de usuario del almacenamiento local y agregarlo al FormData si está presente
    const userIdFromStorage = localStorage.getItem('idUsuario');
    if (userIdFromStorage !== null){
      this.user_id = userIdFromStorage;
      formData.append('user_id', this.user_id);
    }

    // Agregar el ID del proveedor al FormData
    formData.append('proveedor_id', this.formularioMarisco.get('proveedor_id')?.value.toString());

    // Imprimir los datos del FormData en la consola (para propósitos de depuración)
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Llamar al servicio para agregar el marisco con los datos proporcionados
    this.mariscoService.add(formData).subscribe(
      data => {
        console.log(formData);
        console.log(data);
        if (data.success === true){ // Si la operación de agregar es exitosa
          // Obtener todos los mariscos después de agregar uno nuevo
          this.mariscoService.getAll().subscribe(data => {
            this.mariscos = data; // Actualizar la lista de mariscos
            this.onChange.emit(this.mariscos); // Emitir el evento onChange para notificar cambios
            this.toast.success("Marisco añadido correctamente", "Success!"); // Mostrar una notificación de éxito
          });
        }
      },
      error => {
        // Mostrar una notificación de error si falla la operación de agregar
        this.toast.error("Ocurrió un error al añadir el marisco", "Error");
        console.error("Error al añadir el marisco:", error);
      }
    );
  }
}
