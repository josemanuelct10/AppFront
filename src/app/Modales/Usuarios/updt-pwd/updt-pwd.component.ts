import { Component } from '@angular/core'; // Importa el componente de Angular
import { InicioSesionService } from '../../../Services/inicio-sesion.service'; // Importa el servicio para inicio de sesión
import { ToastrService } from 'ngx-toastr'; // Importa el servicio Toastr para notificaciones

@Component({
  selector: 'app-updt-pwd', // Selector del componente
  templateUrl: './updt-pwd.component.html', // Ruta de la plantilla HTML asociada al componente
  styleUrl: './updt-pwd.component.css' // Ruta de los estilos CSS asociados al componente
})
export class UpdtPwdComponent {

  contrasenaAntigua: string = ''; // Almacena la contraseña antigua ingresada por el usuario
  nuevaContrasena: string = ''; // Almacena la nueva contraseña ingresada por el usuario
  confirmarContrasena: string = ''; // Almacena la confirmación de la nueva contraseña ingresada por el usuario
  errorContrasena: string = ''; // Almacena un mensaje de error relacionado con las contraseñas

  constructor(
    private inicioSesionService: InicioSesionService, // Servicio para inicio de sesión
    private toast: ToastrService // Servicio Toastr para notificaciones
  ){}

  // Método para verificar si las contraseñas nuevas coinciden
  contrasenasValidas(): boolean {
    // Validación de contraseñas: al menos 8 caracteres, una mayúscula, una minúscula y un número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(this.nuevaContrasena) && this.nuevaContrasena === this.confirmarContrasena;
  }

  // Método para guardar los datos y actualizar la contraseña
  guardarDatos() {
    const formData = {
      oldPassword: this.contrasenaAntigua, // Contraseña antigua proporcionada por el usuario
      newPassword: this.nuevaContrasena // Nueva contraseña proporcionada por el usuario
    }

    // Llama al método del servicio para actualizar la contraseña
    this.inicioSesionService.updatePwd(formData).subscribe(
      data => {
        if (data.response == 1){ // Si la respuesta del servidor es 1 (éxito)
          this.toast.success("La contraseña ha sido actualizada.", "Success!"); // Muestra una notificación de éxito
        }
        else if (data.response == 0) this.toast.error("La contraseña antigua no es correcta.", "Error!"); // Si la contraseña antigua no es correcta, muestra una notificación de error
      }
    )
  }
}
