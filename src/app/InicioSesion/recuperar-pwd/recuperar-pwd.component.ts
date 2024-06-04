import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-pwd',
  templateUrl: './recuperar-pwd.component.html',
  styleUrls: ['./recuperar-pwd.component.css']
})
export class RecuperarPwdComponent {

  email: string; // Variable para almacenar el correo electrónico del usuario

  constructor(
    private inicioSesionService: InicioSesionService, // Inyección del servicio de inicio de sesión
    private toast: ToastrService, // Inyección del servicio Toastr para mostrar notificaciones
    private router: Router // Inyección del servicio Router para navegar entre rutas

  ){}

  resetPassword(){
    // Método para restablecer la contraseña

    // Construir el objeto FormData con el correo electrónico
    const formData = {
      email: this.email
    }

    // Llamada al servicio para restablecer la contraseña
    this.inicioSesionService.resetPassword(formData).subscribe(
      data => {
        // Manejar la respuesta del servicio

        // Comprobar si se envió el correo de recuperación correctamente
        if (data.response == 1){
          this.toast.success("Email de recuperación enviado correctamente.", "Success!"); // Notificación de éxito
          this.router.navigate(['/']); // Redirección al inicio
        }
        else if (data.response == -1){
          this.toast.error("No se ha encontrado ningún usuario con ese email", "Error!"); // Notificación de error
        }
        else {
          this.toast.error("Ha ocurrido un error al enviar el email.", "Error!"); // Notificación de error
        }
      }
    )
  }
}
