import { Component, Input, OnInit } from '@angular/core';
import { UsuariosServiceService } from '../../../Services/usuarios-service.service';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent implements OnInit {

  @Input() usuario: any;

  categorias: any;

  constructor(
    private usuarioService: UsuariosServiceService,
    private categoriasService: CategoriaUsuariosService
  ){}
  ngOnInit(): void {
    this.categoriasService.getAll().subscribe(
      categorias => {
        this.categorias = categorias;
        console.log(this.categorias);
      }
    )
  }



  guardarDatos() {
    const formData = {
      categoria_usuario_id: this.usuario.categoria_usuario_id
    };

    this.usuarioService.update(this.usuario.id, formData).subscribe(
      data => {
        alert("Usuario actualizado correctamente.");
      },
      error => {
        console.error("Error al actualizar usuario:", error);
        alert("Ocurrió un error al actualizar el usuario.");
      }
    );
  }


}
