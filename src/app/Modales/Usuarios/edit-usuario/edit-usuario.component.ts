import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; // Importa componentes y decoradores de Angular
import { UsuariosServiceService } from '../../../Services/usuarios-service.service'; // Importa el servicio para manejar los usuarios
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service'; // Importa el servicio para manejar las categorías de usuarios
import { ToastrService } from 'ngx-toastr'; // Importa el servicio Toastr para notificaciones
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal de ng-bootstrap para manejar modales

@Component({
  selector: 'app-edit-usuario', // Selector del componente
  templateUrl: './edit-usuario.component.html', // Ruta de la plantilla HTML asociada al componente
  styleUrls: ['./edit-usuario.component.css'] // Ruta de los estilos CSS asociados al componente
})
export class EditUsuarioComponent implements OnInit {

  @Input() usuario: any; // Propiedad de entrada que recibe los datos del usuario a editar

  usuarios: any; // Almacena la lista de usuarios

  categorias: any; // Almacena la lista de categorías de usuarios

  constructor(
    private usuarioService: UsuariosServiceService, // Servicio para manejar los usuarios
    private categoriasService: CategoriaUsuariosService, // Servicio para manejar las categorías de usuarios
    private toast: ToastrService, // Servicio Toastr para notificaciones
    public modal: NgbActiveModal // Servicio para manejar modales
  ){}

  ngOnInit(): void {
    // Al inicializar el componente, se cargan las categorías de usuarios disponibles
    this.categoriasService.getAll().subscribe(
      categorias => {
        this.categorias = categorias; // Asigna las categorías obtenidas al arreglo categorias
        console.log(this.categorias); // Imprime las categorías en la consola
      }
    )
  }

  guardarDatos() {
    // Construye el objeto formData con los datos del usuario a actualizar
    const formData = {
      categoria_usuario_id: this.usuario.categoria_usuario_id // Obtiene el ID de la categoría del usuario
    };

    // Envía los datos del formulario al servicio para actualizar el usuario
    this.usuarioService.update(this.usuario.id, formData).subscribe(
      data => {
        console.log(data); // Imprime la respuesta del servidor en la consola
        if (data){ // Si la respuesta del servidor es exitosa
          // Se recargan todos los usuarios y se cierra el modal
          this.usuarioService.getAll().subscribe(
            usuarios => {
              this.toast.success("Usuario actualizado correctamente.", "Success!"); // Muestra una notificación de éxito
              this.modal.close(usuarios); // Cierra el modal
            }
          )
        }
      },
      error => {
        console.error("Error al actualizar usuario:", error); // Si ocurre un error, imprime el error en la consola
        this.toast.error("No se ha podido actualizar el usuario.", "Error!"); // Muestra una notificación de error
      }
    );
  }
}
