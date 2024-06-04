import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';
import { ToastrService } from 'ngx-toastr'; // Importación del servicio Toastr para mostrar mensajes

@Component({
  selector: 'app-add-categoria-usuarios',
  templateUrl: './add-categoria-usuarios.component.html',
  styleUrls: ['./add-categoria-usuarios.component.css']
})
export class AddCategoriaUsuariosComponent {
  descripcion: string; // Variable para almacenar la descripción de la nueva categoría
  @Output() onChange = new EventEmitter<any>(); // Evento para emitir cambios a otros componentes

  constructor(
    private categoriasService: CategoriaUsuariosService, // Servicio para gestionar categorías de usuarios
    private toast: ToastrService // Servicio Toastr para mostrar notificaciones
  ){}

  guardarDatos(){
    // Método para guardar los datos de la nueva categoría de usuario

    const formData = {
      descripcion: this.descripcion // Objeto con la descripción de la categoría
    }

    // Llamada al servicio para agregar la nueva categoría
    this.categoriasService.add(formData).subscribe( data=> {
      // Actualizar la lista de categorías después de agregar una nueva
      this.categoriasService.getAll().subscribe(
        categorias => {
          this.onChange.emit(categorias); // Emitir el evento con las categorías actualizadas
        }
      )
      this.toast.success('La categoria ha sido borrada correctamente.', 'Success'); // Notificación de éxito
    });
  }
}
