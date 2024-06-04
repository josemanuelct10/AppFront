import { Component, EventEmitter, Input, Output } from '@angular/core'; // Importa componentes y decoradores de Angular
import { UsuariosServiceService } from '../../../Services/usuarios-service.service'; // Importa el servicio para manejar los usuarios
import { ToastrService } from 'ngx-toastr'; // Importa el servicio Toastr para notificaciones
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal de ng-bootstrap para manejar modales

@Component({
  selector: 'app-rm-usuario', // Selector del componente
  templateUrl: './rm-usuario.component.html', // Ruta de la plantilla HTML asociada al componente
  styleUrl: './rm-usuario.component.css' // Ruta de los estilos CSS asociados al componente
})
export class RmUsuarioComponent {

  @Input() usuario: any; // Propiedad de entrada que recibe los datos del usuario a eliminar

  constructor(
    private usuariosService: UsuariosServiceService, // Servicio para manejar los usuarios
    private toast: ToastrService, // Servicio Toastr para notificaciones
    public modal: NgbActiveModal // Servicio para manejar modales
  ){}

  eliminarUsuario(){
    // Llama al método del servicio para eliminar el usuario
    this.usuariosService.rm(this.usuario.id).subscribe(
      data => {
        console.log(data); // Imprime la respuesta del servidor en la consola
        if (data.success === true){ // Si la eliminación es exitosa
          // Se recargan todos los usuarios y se cierra el modal
          this.usuariosService.getAll().subscribe(
            usuarios => {
              this.toast.success("Usuario eliminado correctamente.", "Success!"); // Muestra una notificación de éxito
              this.modal.close(usuarios); // Cierra el modal
            }
          );
        }
      }
    );
  }
}
