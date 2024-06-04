import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InicioSesionComponent } from '../../InicioSesion/inicio-sesion/inicio-sesion.component'; // Importa el componente de inicio de sesión
import { InicioSesionService } from '../../Services/inicio-sesion.service'; // Importa el servicio de inicio de sesión
import { ToastrService } from 'ngx-toastr'; // Importa el servicio Toastr para mostrar notificaciones
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup y Validators para manejar formularios
import { passwordValidator } from '../../Interfaces/Validaciones'; // Importa el validador personalizado de contraseña

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  token: any; // Almacena el token pasado en la URL
  showForm: boolean = false; // Variable para mostrar u ocultar el formulario
  formPassword: FormGroup; // FormGroup para el formulario de cambio de contraseña

  constructor(
    private routeActivate: ActivatedRoute, // Servicio para acceder a los parámetros de la ruta
    private inicioSesionService: InicioSesionService, // Servicio para manejar la autenticación
    private toast: ToastrService, // Servicio para mostrar notificaciones
    private route: Router, // Servicio para navegar a otras rutas
    private formBuilder: FormBuilder // Constructor de formularios
  ) {
    // Construye el formulario con un campo de contraseña que requiere una contraseña válida
    this.formPassword = formBuilder.group({
      password: ['', [Validators.required, passwordValidator()]]
    });
  }

  ngOnInit(): void {
    // Observa los cambios en los parámetros de la URL
    this.routeActivate.queryParams.subscribe(params => {
      // Obtiene el token de la URL
      this.token = this.routeActivate.snapshot.paramMap.get('token');
      console.log(this.token);

      // Verifica si el token es válido
      let formData = { token: this.token };
      this.inicioSesionService.validateResetToken(formData).subscribe(
        (data: any) => {
          // Si el token es válido, muestra el formulario de cambio de contraseña
          if (data.response == 1){
            this.showForm = true;
          } else if (data.response == 0){
            console.log("ERROR", data);
          }
        }
      );
    });
  }

  // Método para actualizar la contraseña
  actualizarPassword(): void {
    // Obtiene la nueva contraseña del formulario
    const formData = {
      newPassword: this.formPassword.get('password')?.value,
      token: this.token
    }

    // Llama al servicio para cambiar la contraseña
    this.inicioSesionService.changePwd(formData).subscribe(
      (data: any) => {
        // Si se cambia la contraseña con éxito, muestra una notificación y redirige al usuario a la página de inicio de sesión
        if (data.response == 1){
          this.toast.success("Contraseña cambiada correctamente.", "Success!");
          this.route.navigate(['/']);
        }
        // Si el token no es válido o ha caducado, muestra una notificación de error
        else if (data.response == 0){
          this.toast.error("El token no es válido o ha caducado.", "Error!");
        }
        // Si ocurre un error inesperado, muestra una notificación de error
        else {
          this.toast.error("Ha ocurrido un error. Pongase en contacto con el administrador.", "Error!");
        }
      }
    );
  }
}
