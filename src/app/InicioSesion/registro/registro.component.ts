import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ageValidator, dniValidator, passwordValidator } from '../../Interfaces/Validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formRegistro: FormGroup; // Formulario de registro

  constructor (
    private formBuilder: FormBuilder, // Constructor de formularios
    private inicioSesion: InicioSesionService, // Servicio de inicio de sesión
    private router: Router, // Servicio de enrutamiento
    private toast: ToastrService // Servicio Toastr para notificaciones
    ){
      // Construir el formulario con validadores
      this.formRegistro = formBuilder.group({
        nombre: ['', Validators.required], // Nombre requerido
        email: ['', [Validators.email, Validators.required]], // Email válido y requerido
        dni: ['', [Validators.required, dniValidator()]], // DNI válido y requerido
        password: ['', [Validators.required, passwordValidator()]], // Contraseña válida y requerida
        fechaNacimiento: ['', [Validators.required, ageValidator(18)]], // Fecha de nacimiento válida y mayor de 18 años
        telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Teléfono válido y requerido
        direccion: ['', Validators.required] // Dirección requerida
      })
    }

  onSubmit(){
    // Método para enviar el formulario de registro

    // Construir el objeto con los datos del formulario
    const formData = {
      name: this.formRegistro.get('nombre')?.value,
      email: this.formRegistro.get('email')?.value,
      dni: this.formRegistro.get('dni')?.value,
      password: this.formRegistro.get('password')?.value,
      fecha_nacimiento: this.formRegistro.get('fechaNacimiento')?.value,
      telefono: this.formRegistro.get('telefono')?.value,
      direccion: this.formRegistro.get('direccion')?.value,
      categoria_usuario_id: 2 // ID de categoría de usuario (supongo que es para usuarios registrados)
    }

    // Loguear los datos del formulario
    console.log(formData);

    // Llamada al servicio de registro
    this.inicioSesion.registro(formData).subscribe(
      response => {
        // Manejar la respuesta del servicio de registro

        // Comprobar si el registro fue exitoso
        if (response.response == 1){
          this.toast.success("Se ha registrado correctamente.", "Success!"); // Notificación de éxito
          this.router.navigate(['/']); // Redirección al inicio
        }
        // Comprobar si ya existe un usuario con el DNI proporcionado
        else if(response.response == 0){
          this.toast.error("Ya existe un usuario con ese DNI.", "Error!"); // Notificación de error
          this.formRegistro.get('password')?.reset();  // Resetea el campo de la contraseña
        }
        // Comprobar si ya existe un usuario con el email proporcionado
        else if(response.response == -1){
          this.toast.error("Ya existe un usuario con ese email.", "Error!"); // Notificación de error
          this.formRegistro.get('password')?.reset(); // Resetea el campo de la contraseña
        }
        // Comprobar si ya existe un usuario con el teléfono proporcionado
        else if(response.response == -2){
          this.toast.error("Ya existe un usuario con ese telefono.", "Error!"); // Notificación de error
          this.formRegistro.get('password')?.reset(); // Resetea el campo de la contraseña
        }
        // Si ocurre otro tipo de error
        else {
          this.toast.error("ERROR: Ha ocurrido un error en el servidor.", "Error!"); // Notificación de error
        }
      });
    }
}
