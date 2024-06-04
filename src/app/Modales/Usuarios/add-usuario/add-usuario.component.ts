import { Component, EventEmitter, OnInit, Output } from '@angular/core'; // Importa componentes y decoradores de Angular
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service'; // Importa el servicio para manejar las categorías de usuarios
import { UsuariosServiceService } from '../../../Services/usuarios-service.service'; // Importa el servicio para manejar los usuarios
import { InicioSesionService } from '../../../Services/inicio-sesion.service'; // Importa el servicio para inicio de sesión
import { ToastrService } from 'ngx-toastr'; // Importa el servicio Toastr para notificaciones
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup y Validators para la construcción de formularios
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal de ng-bootstrap para manejar modales
import { ageValidator, dniValidator } from '../../../Interfaces/Validaciones'; // Importa funciones de validación personalizadas

@Component({
  selector: 'app-add-usuario', // Selector del componente
  templateUrl: './add-usuario.component.html', // Ruta de la plantilla HTML asociada al componente
  styleUrls: ['./add-usuario.component.css'] // Ruta de los estilos CSS asociados al componente
})
export class AddUsuarioComponent implements OnInit {

  formUsuario: FormGroup; // Formulario para la entrada de datos del usuario
  categoriasUsuarios: any; // Almacena las categorías de usuarios disponibles

  constructor(
    private categoriasService: CategoriaUsuariosService, // Servicio para manejar las categorías de usuarios
    private usuarioService: UsuariosServiceService, // Servicio para manejar los usuarios
    private inicioSesion: InicioSesionService, // Servicio para inicio de sesión
    private toast: ToastrService, // Servicio Toastr para notificaciones
    private formBuilder: FormBuilder, // Constructor de formularios
    public modal: NgbActiveModal // Servicio para manejar modales
  ){
    this.formUsuario = formBuilder.group({
      nombre: ['', Validators.required], // Campo nombre del formulario, requerido
      email: ['',[Validators.required, Validators.email]], // Campo email del formulario, requerido y formato de email válido
      dni: ['', [Validators.required, dniValidator()]], // Campo DNI del formulario, requerido y validado por una función personalizada
      fechaNacimiento: ['', [Validators.required, ageValidator(18)]], // Campo fecha de nacimiento del formulario, requerido y validado por una función personalizada
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Campo teléfono del formulario, requerido y validado por una expresión regular
      direccion: ['', Validators.required], // Campo dirección del formulario, requerido
      categoriaUsuario: ['', Validators.required] // Campo categoría de usuario del formulario, requerido
    });
  }

  ngOnInit(): void {
    // Al inicializar el componente, se cargan las categorías de usuarios disponibles
    this.categoriasService.getAll().subscribe(
      data => this.categoriasUsuarios = data
    )
  }

  guardarDatos(){
    let password = "123"; // Se genera una contraseña temporal

    // Se construye el objeto formData con los datos del formulario
    const formData = {
      name: this.formUsuario.get('nombre')?.value, // Nombre del usuario
      email: this.formUsuario.get('email')?.value, // Email del usuario
      password: password, // Contraseña temporal
      dni: this.formUsuario.get('dni')?.value, // DNI del usuario
      fecha_nacimiento: this.formUsuario.get('fechaNacimiento')?.value, // Fecha de nacimiento del usuario
      telefono: this.formUsuario.get('telefono')?.value, // Teléfono del usuario
      direccion: this.formUsuario.get('direccion')?.value, // Dirección del usuario
      categoria_usuario_id: this.formUsuario.get('categoriaUsuario')?.value // ID de la categoría de usuario seleccionada
    }

    // Se envían los datos del formulario al servicio de registro de usuarios
    this.inicioSesion.registro(formData).subscribe(
      data => {
        if (data.response == 1){ // Si el registro es exitoso
          // Se recargan todos los usuarios y se cierra el modal
          this.usuarioService.getAll().subscribe(
            data => {
              this.modal.close(data);
              this.toast.success("Usuario creado correctamente.", "Success!"); // Se muestra una notificación de éxito
            }
          );
        }
        else if(data.response == 0) this.toast.error("Ya existe un usuario con ese DNI.", "Error!"); // Si ya existe un usuario con ese DNI
        else if(data.response == -1) this.toast.error("Ya existe un usuario con ese email.", "Error!"); // Si ya existe un usuario con ese email
        else if(data.response == -2) this.toast.error("Ya existe un usuario con ese telefono.", "Error!"); // Si ya existe un usuario con ese teléfono
        else {
          this.toast.error("ERROR: Ha ocurrido un error en el servidor.", "Error!"); // Si ocurre un error desconocido
        }
      }
    )
  }
}
