import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InicioSesionService } from '../../../Services/inicio-sesion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updt-usuario',
  templateUrl: './updt-usuario.component.html',
  styleUrl: './updt-usuario.component.css'
})
export class UpdtUsuarioComponent {

  @Input() usuario: any;
  @Output() onChange = new EventEmitter<any>();

  constructor(
    private inicioSesionService: InicioSesionService,
    private toast: ToastrService
  ){}

  guardarDatos(){

    const formData = {
      name: this.usuario.name,
      email: this.usuario.email,
      telefono: this.usuario.telefono,
      direccion: this.usuario.direccion,
      fechaNacimiento: this.usuario.fechaNacimiento
    }

    console.log(formData);
    this.inicioSesionService.updateProfile(formData).subscribe(
      data => {
        if (data.response == 1){
          this.toast.success(this.usuario.name + " has modificado correctamente tu perfil!", "Success!");
        }
        else this.toast.error(this.usuario.name + " ha ocurrido un error al actualizar su usuario!", "Error!");
      }
    )

  }

}
