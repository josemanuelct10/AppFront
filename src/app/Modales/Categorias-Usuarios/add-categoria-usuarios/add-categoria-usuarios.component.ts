import { Component } from '@angular/core';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';

@Component({
  selector: 'app-add-categoria-usuarios',
  templateUrl: './add-categoria-usuarios.component.html',
  styleUrl: './add-categoria-usuarios.component.css'
})
export class AddCategoriaUsuariosComponent {
  descripcion: string;

  constructor(
    private categoriasService: CategoriaUsuariosService
  ){}

  guardarDatos(){
    const formData = {
      descripcion: this.descripcion
    }

    this.categoriasService.add(formData).subscribe( data=> {
      alert("Categoría de Usuarios guardada correctamente.");
    });  }
}
