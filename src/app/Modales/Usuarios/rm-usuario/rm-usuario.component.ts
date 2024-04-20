import { Component, Input } from '@angular/core';
import { UsuariosServiceService } from '../../../Services/usuarios-service.service';

@Component({
  selector: 'app-rm-usuario',
  templateUrl: './rm-usuario.component.html',
  styleUrl: './rm-usuario.component.css'
})
export class RmUsuarioComponent {

  @Input() id: any;
  @Input() nombre: any;

  constructor(
    private usuariosService: UsuariosServiceService
  ){}

  eliminarUsuario(){
    this.usuariosService.rm(this.id).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
