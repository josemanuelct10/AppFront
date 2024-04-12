import { Component, Input } from '@angular/core';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';

@Component({
  selector: 'app-rm-categorias-usuarios',
  templateUrl: './rm-categorias-usuarios.component.html',
  styleUrl: './rm-categorias-usuarios.component.css'
})
export class RmCategoriasUsuariosComponent {

  @Input() id: number;
  @Input() descripcion: string;

  mensaje: string;

constructor(private categoriasService: CategoriaUsuariosService){}

eliminarCategoria(){
  this.categoriasService.check(this.id).subscribe(
    tieneUsuarios => {
      if (tieneUsuarios){
        this.mensaje = "No se puede eliminar la categoría si existen usuarios con ella.";
      }
      else{
        this.categoriasService.rm(this.id).subscribe(
          data => {
            console.log(data);
            alert("Categoria de Usuarios eliminada correctamente.");
          }
        )
      }
    }
  )
}


}
