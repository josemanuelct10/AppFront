import { Component, Input } from '@angular/core';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-categorias-usuarios',
  templateUrl: './rm-categorias-usuarios.component.html',
  styleUrl: './rm-categorias-usuarios.component.css'
})
export class RmCategoriasUsuariosComponent {

  @Input() id: number;
  @Input() descripcion: string;

  mensaje: string;

constructor(
  private categoriasService: CategoriaUsuariosService,
  private toast: ToastrService
){}

eliminarCategoria(){
  this.categoriasService.check(this.id).subscribe(
    tieneUsuarios => {
      if (tieneUsuarios){
        this.toast.warning("La categoría a borrar tiene usuarios.", "Warning");
      }
      else{
        this.categoriasService.rm(this.id).subscribe(
          data => {
            console.log(data);
            this.toast.success('La categoria ha sido borrada correctamente.', 'Success')
            window.location.reload();
          }
        )
      }
    }
  )
}


}
