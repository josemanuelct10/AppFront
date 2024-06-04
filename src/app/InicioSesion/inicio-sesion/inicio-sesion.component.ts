import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { ToastrService } from 'ngx-toastr'; // Importación del servicio Toastr para mostrar mensajes

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  email: string; // Variable para almacenar el correo electrónico del usuario
  password: string; // Variable para almacenar la contraseña del usuario

  constructor(
    private router: Router, // Inyección del servicio Router para navegar entre rutas
    private inicioSesion: InicioSesionService, // Inyección del servicio de inicio de sesión
    private toast: ToastrService // Inyección del servicio Toastr para mostrar notificaciones
    ){}


  onSubmit(){
    // Método llamado cuando se envía el formulario de inicio de sesión

    // Llamada al método de inicio de sesión del servicio
    this.inicioSesion.login(this.email, this.password)
      .subscribe(response=>{
        // Manejo de la respuesta exitosa del inicio de sesión

        // Almacenamiento de información del usuario en el almacenamiento local
        localStorage.setItem('idUsuario',  response.user.id);
        localStorage.setItem('categoriaUsuario',  response.user.categoria_usuario_id);
        console.log(response);

        // Redirección dependiendo del tipo de usuario y notificación de éxito
        if (response.user.categoria_usuario_id === 1 || response.user.categoria_usuario_id == 3){
          this.router.navigate(['/trabajador/inicio']); // Redirección para usuarios administradores
          this.toast.success("Bienvenido Administrador!", "Success!"); // Notificación de éxito
        }
        else{
          this.router.navigate(['/inicio']); // Redirección para otros usuarios
          this.toast.success("Se ha iniciado sesion correctamente!", "Success!"); // Notificación de éxito
        }

      }, error=> {
          // Manejo de errores de inicio de sesión

          console.error('Error de inicio de sesión:', error); // Log de error en la consola
          this.password = ""; // Limpiar el campo de contraseña
          this.toast.error("Credenciales Incorrectas!", "Error!"); // Notificación de error
      })

      console.log(this.password, this.email); // Log de la contraseña y el correo electrónico
  }
}
