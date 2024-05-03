import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsuariosServiceService } from '../../../Services/usuarios-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-usuario',
  templateUrl: './rm-usuario.component.html',
  styleUrl: './rm-usuario.component.css'
})
export class RmUsuarioComponent {

  @Input() id: any;
  @Input() nombre: any;
  @Output() onChange = new EventEmitter<any>();


  constructor(
    private usuariosService: UsuariosServiceService,
    private toast: ToastrService
  ){}

  eliminarUsuario(){
    this.usuariosService.rm(this.id).subscribe(
      data => {
        console.log(data);
        if (data.success === true){
          this.usuariosService.getAll().subscribe(
          usuarios => {
            this.onChange.emit(usuarios);
            this.toast.success("Usuario actualizado correctamente.", "Success!");
          }
      )};
      }
    )
  }

}
