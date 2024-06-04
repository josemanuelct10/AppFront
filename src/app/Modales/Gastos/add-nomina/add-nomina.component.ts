import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosServiceService } from '../../../Services/usuarios-service.service'; // Servicio para gestionar los usuarios
import { GastosServiceService } from '../../../Services/gastos-service.service'; // Servicio para gestionar los gastos
import { forkJoin } from 'rxjs'; // Operador para combinar múltiples observables
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Constructor de formularios y validadores
import { ToastrService } from 'ngx-toastr'; // Servicio Toastr para mostrar notificaciones
import { fileValidator } from '../../../Interfaces/Validaciones'; // Validador personalizado para archivos
import { v4 as uuidv4 } from 'uuid'; // Generador de UUID

@Component({
  selector: 'app-add-nomina',
  templateUrl: './add-nomina.component.html',
  styleUrls: ['./add-nomina.component.css']
})
export class AddNominaComponent implements OnInit {

  @Output() onChange = new EventEmitter<any>(); // Evento para emitir cambios a otros componentes

  formNomina: FormGroup; // Formulario para agregar nóminas
  trabajadores: any; // Lista de trabajadores
  documento: File | null = null; // Documento adjunto de la nómina

  constructor(
    private usuariosService: UsuariosServiceService, // Servicio para gestionar los usuarios
    private gastosService: GastosServiceService, // Servicio para gestionar los gastos
    private toast: ToastrService, // Servicio Toastr para mostrar notificaciones
    private formBuilder: FormBuilder // Constructor de formularios
  ){
    // Construir el formulario de nómina con validadores
    this.formNomina = formBuilder.group({
      descripcion: ['', Validators.required], // Descripción requerida
      cantidad: ['', [Validators.required, Validators.min(0.1)]], // Cantidad requerida y mayor que cero
      documento: [null, fileValidator()], // Documento adjunto validado
      fecha: ['', Validators.required], // Fecha requerida
      user_id: ['', Validators.required] // Identificación de usuario requerida
    })
  }

  // Método para manejar la selección de archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    this.documento = file; // Asignar el archivo seleccionado a la variable
    this.formNomina.patchValue({ documento: file }); // Actualizar el valor del formulario con el archivo
    this.formNomina.get('documento')?.updateValueAndValidity(); // Validar el campo de documento en el formulario
  }

  // Método para inicializar el componente
  ngOnInit(): void {
    // Combinar las solicitudes para obtener trabajadores de diferentes categorías
    forkJoin({
      categoria1: this.usuariosService.getByCategoria(3), // Obtener trabajadores de la categoría 3
      categoria2: this.usuariosService.getByCategoria(1) // Obtener trabajadores de la categoría 1
    }).subscribe({
      next: (resultados: { categoria1: any, categoria2: any }) => { // Manejar la respuesta exitosa
        this.trabajadores = [...resultados.categoria1, ...resultados.categoria2]; // Combinar y asignar trabajadores
      },
      error: (error) => { // Manejar errores
        console.error('Error al obtener trabajadores:', error);
      }
    });
  }

  // Método para guardar los datos de la nómina
  guardarDatos(){
    const fechaString = this.formNomina.get('fecha')?.value.toString(); // Obtener la fecha como string

    // Conversion del Documento a Base64
    if (this.documento){
      const reader = new FileReader(); // Crear un lector de archivos

      reader.onload = () => {
        const documentoBase64 = reader.result as string; // Obtener el documento como Base64

        const formData = {
          user_id: this.formNomina.get('user_id')?.value, // Obtener el ID del usuario
          referencia: "NOM-" + fechaString.replace(/-/g, '') + "-" + this.formNomina.get('user_id')?.value + uuidv4(), // Generar una referencia única usando UUID
          descripcion: this.formNomina.get('descripcion')?.value, // Obtener la descripción de la nómina
          cantidad: this.formNomina.get('cantidad')?.value, // Obtener la cantidad de la nómina
          documento: documentoBase64, // Asignar el documento como Base64
          fecha: this.formNomina.get('fecha')?.value // Obtener la fecha de la nómina
        }

        // Enviar los datos de la nómina al servicio de gastos
        this.gastosService.add(formData).subscribe(
          data => {
            if (data.success === true){ // Verificar si la operación fue exitosa
              // Obtener todos los gastos actualizados
              this.gastosService.getAll().subscribe(
                datos => {
                  // Emitir el evento con los gastos actualizados
                  this.onChange.emit(datos);
                  // Mostrar una notificación de éxito
                  this.toast.success("Nómina añadida correctamente.", "Success!");
                }
              )
            }
          },
          (error) => {
            // Mostrar una notificación de error en caso de fallo
            this.toast.error("Error al añadir la nómina.", "Error!");
          }
        )
      };
      reader.readAsDataURL(this.documento); // Leer el archivo seleccionado
    }
  }
}
