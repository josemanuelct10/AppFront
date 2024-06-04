import { Component, EventEmitter, Output } from '@angular/core';
import { GastosServiceService } from '../../../Services/gastos-service.service'; // Servicio para gestionar los gastos
import { v4 as uuidv4 } from 'uuid'; // Generador de UUID
import { ToastrService } from 'ngx-toastr'; // Servicio Toastr para mostrar notificaciones
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Constructor de formularios y validadores
import { fileValidator } from '../../../Interfaces/Validaciones'; // Validador personalizado para archivos

@Component({
  selector: 'app-add-gastos-extra',
  templateUrl: './add-gastos-extra.component.html',
  styleUrls: ['./add-gastos-extra.component.css']
})
export class AddGastosExtraComponent {

  @Output() onChange = new EventEmitter<any>(); // Evento para emitir cambios a otros componentes

  formGasto: FormGroup; // Formulario para agregar gastos extra
  documento: any; // Documento adjunto

  // Método para manejar la selección de archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    this.documento = file; // Asignar el archivo seleccionado a la variable
    this.formGasto.patchValue({ documento: file }); // Actualizar el valor del formulario con el archivo
    this.formGasto.get('documento')?.updateValueAndValidity(); // Validar el campo de documento en el formulario
  }

  constructor(
    private formBuilder: FormBuilder, // Constructor de formularios
    private gastoService: GastosServiceService, // Servicio para gestionar los gastos
    private toast: ToastrService // Servicio Toastr para mostrar notificaciones
  ){
    // Construir el formulario de gastos extra con validadores
    this.formGasto = formBuilder.group({
      descripcion: ['', Validators.required], // Descripción requerida
      cantidad: ['', [Validators.required, Validators.min(0.1)]], // Cantidad requerida y mayor que cero
      fecha: ['', Validators.required], // Fecha requerida
    });
  }

  // Método para guardar los datos del gasto extra
  guardarDatos() {
    const fechaString = this.formGasto.get('fecha')?.value.toString(); // Obtener la fecha como string

    const formData = {
      referencia: "GASEXT-" + fechaString.replace(/-/g, '') + "-" + uuidv4(), // Referencia única usando UUID
      descripcion: this.formGasto.get('descripcion')?.value, // Descripción del gasto extra
      cantidad: this.formGasto.get('cantidad')?.value, // Cantidad del gasto extra
      documento: null as string | null, // Inicialmente se establece en null
      fecha: this.formGasto.get('fecha')?.value // Fecha del gasto extra
    };

    // Verificar si se ha seleccionado un documento
    if (this.documento) {
      const reader = new FileReader(); // Crear un lector de archivos

      reader.onload = () => {
        formData.documento = reader.result as string; // Asignar el documento solo si se selecciona un archivo
        this.enviarGasto(formData); // Enviar el gasto con los datos completos
      };

      reader.readAsDataURL(this.documento); // Leer el archivo seleccionado
    } else {
      this.enviarGasto(formData); // Enviar el gasto con el documento null si no se selecciona ningún archivo
    }
  }

  // Método para enviar el gasto al servicio
  enviarGasto(formData: any) {
    this.gastoService.add(formData).subscribe(
      data => {
        if (data.success === true) { // Verificar si la operación fue exitosa
          // Obtener todos los gastos actualizados
          this.gastoService.getAll().subscribe(
            gastosAct => {
              // Emitir el evento con los gastos actualizados
              this.onChange.emit(gastosAct);
              // Mostrar una notificación de éxito
              this.toast.success("Gasto Extra añadido correctamente.", "Success!");
            }
          );
        }
      },
      (error) => {
        // Mostrar una notificación de error en caso de fallo
        this.toast.error("Error al añadir el gasto extra.", "Error!");
      }
    );
  }
}
