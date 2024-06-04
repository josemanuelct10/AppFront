import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; // Importa componentes y decoradores de Angular
import { InicioSesionService } from '../../../Services/inicio-sesion.service'; // Importa el servicio para inicio de sesión
import { ToastrService } from 'ngx-toastr'; // Importa el servicio Toastr para notificaciones
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal de ng-bootstrap para manejar modales
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup y Validators para la construcción de formularios

@Component({
  selector: 'app-updt-usuario', // Selector del componente
  templateUrl: './updt-usuario.component.html', // Ruta de la plantilla HTML asociada al componente
  styleUrl: './updt-usuario.component.css' // Ruta de los estilos CSS asociados al componente
})
export class UpdtUsuarioComponent implements OnInit {

  @Input() usuario: any; // Propiedad de entrada que recibe los datos del usuario a actualizar

  usuarioActualizado: any = { // Objeto para almacenar los datos actualizados del usuario
    NOMBRE: '',
    EMAIL: '',
    TELEFONO: '',
    DIRECCION: '',
    FECHA_NACIMIENTO: ''
  }

  constructor(
    private inicioSesionService: InicioSesionService, // Servicio para inicio de sesión
    private toast: ToastrService, // Servicio Toastr para notificaciones
    public modal: NgbActiveModal, // Servicio para manejar modales
  ){}


  ngOnInit(): void {
    // Inicializa los datos actualizados del usuario si se proporciona un usuario
    if (this.usuario){
      this.usuarioActualizado.NOMBRE = this.usuario.name,
      this.usuarioActualizado.EMAIL = this.usuario.email,
      this.usuarioActualizado.TELEFONO = this.usuario.telefono,
      this.usuarioActualizado.DIRECCION = this.usuario.direccion,
      this.usuarioActualizado.FECHA_NACIMIENTO = this.usuario.fecha_nacimiento
    }
  }

  // Método para guardar los datos actualizados del usuario
  guardarDatos(){

    // Construye el objeto formData con los datos actualizados del usuario
    const formData = {
      name: this.usuarioActualizado.NOMBRE,
      email: this.usuarioActualizado.EMAIL,
      telefono: this.usuarioActualizado.TELEFONO,
      direccion: this.usuarioActualizado.DIRECCION,
      fechaNacimiento: this.usuarioActualizado.FECHA_NACIMIENTO
    }

    // Llama al método del servicio para actualizar el perfil del usuario
    this.inicioSesionService.updateProfile(formData).subscribe(
      data => {
        if (data.response == 1){ // Si la respuesta del servidor es 1 (éxito)
          this.toast.success(this.usuario.name + " has modificado correctamente tu perfil!", "Success!"); // Muestra una notificación de éxito
          let usuarioActualizado = data.data; // Obtiene los datos actualizados del usuario desde la respuesta del servidor
          this.modal.close(usuarioActualizado); // Cierra el modal y devuelve los datos actualizados del usuario
        } else if (data.response == -1){ // Si la respuesta del servidor es -1 (email duplicado)
          this.toast.error('Ese email ya esta ocupado por otro usuario.', "Error!"); // Muestra una notificación de error
        } else if (data.response == -2){ // Si la respuesta del servidor es -2 (teléfono duplicado)
          this.toast.error("Ese telefono ya esta ocupado por otro usuario.", "Error!"); // Muestra una notificación de error
        }
        else this.toast.error(this.usuario.name + " ha ocurrido un error al actualizar su usuario!", "Error!"); // Si la respuesta del servidor es otro código de error, muestra una notificación de error
      }
    )
  }

}
