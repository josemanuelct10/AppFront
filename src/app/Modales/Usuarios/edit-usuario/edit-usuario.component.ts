import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuariosServiceService } from '../../../Services/usuarios-service.service';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent implements OnInit {

  @Input() usuario: any;
  @Output() onChange = new EventEmitter<any>();

  usuarios: any;

  categorias: any;

  constructor(
    private usuarioService: UsuariosServiceService,
    private categoriasService: CategoriaUsuariosService,
    private toast: ToastrService
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
        console.log(data);
        if (data){
          this.usuarioService.getAll().subscribe(
            usuarios => {
              this.onChange.emit(usuarios);
              this.toast.success("Usuario actualizado correctamente.", "Success!");
            }
          )
        }
      },
      error => {
        console.error("Error al actualizar usuario:", error);
        this.toast.error("No se ha podido actualizar el usuario.", "Error!");
      }
    );
  }


}
