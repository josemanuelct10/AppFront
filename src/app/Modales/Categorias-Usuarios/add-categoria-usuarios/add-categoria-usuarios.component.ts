import { Component } from '@angular/core';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-categoria-usuarios',
  templateUrl: './add-categoria-usuarios.component.html',
  styleUrl: './add-categoria-usuarios.component.css'
})
export class AddCategoriaUsuariosComponent {
  descripcion: string;

  constructor(
    private categoriasService: CategoriaUsuariosService,
    private toast: ToastrService
  ){}

  guardarDatos(){
    const formData = {
      descripcion: this.descripcion
    }

    this.categoriasService.add(formData).subscribe( data=> {
      this.toast.success('La categoria ha sido borrada correctamente.', 'Success');
      window.location.reload();
    });
  }
}
