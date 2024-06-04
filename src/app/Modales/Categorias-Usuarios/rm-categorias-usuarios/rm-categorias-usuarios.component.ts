import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';
import { ToastrService } from 'ngx-toastr'; // Importación del servicio Toastr para mostrar mensajes

@Component({
  selector: 'app-rm-categorias-usuarios',
  templateUrl: './rm-categorias-usuarios.component.html',
  styleUrls: ['./rm-categorias-usuarios.component.css']
})
export class RmCategoriasUsuariosComponent {

  @Input() id: number; // Propiedad de entrada que recibe el ID de la categoría
  @Input() descripcion: string; // Propiedad de entrada que recibe la descripción de la categoría
  @Output() onChange = new EventEmitter<any>(); // Evento de salida para notificar cambios a otros componentes

  mensaje: string; // Variable para almacenar mensajes relacionados con la eliminación

  constructor(
    private categoriasService: CategoriaUsuariosService, // Servicio para gestionar categorías de usuarios
    private toast: ToastrService // Servicio Toastr para mostrar notificaciones
  ){}

  eliminarCategoria(){
    // Método para eliminar la categoría de usuarios

    // Comprobar si la categoría tiene usuarios asociados
    this.categoriasService.check(this.id).subscribe(
      tieneUsuarios => {
        if (tieneUsuarios){
          this.toast.warning("La categoría a borrar tiene usuarios.", "Warning"); // Notificación de advertencia si hay usuarios asociados
        }
        else{
          // Si la categoría no tiene usuarios asociados, eliminarla
          this.categoriasService.rm(this.id).subscribe(
            data => {
              console.log(data); // Log de la respuesta del servicio
              this.toast.success('La categoria ha sido borrada correctamente.', 'Success'); // Notificación de éxito
              // Actualizar la lista de categorías después de eliminar una
              this.categoriasService.getAll().subscribe(
                categorias =>{
                  this.onChange.emit(categorias); // Emitir el evento con las categorías actualizadas
                }
              )
            }
          )
        }
      }
    )
  }
}
