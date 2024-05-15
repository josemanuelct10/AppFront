import { Component } from '@angular/core';
import { InicioSesionService } from '../../../Services/inicio-sesion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updt-pwd',
  templateUrl: './updt-pwd.component.html',
  styleUrl: './updt-pwd.component.css'
})
export class UpdtPwdComponent {
  contrasenaAntigua: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  errorContrasena: string = '';

  constructor(
    private inicioSesionService: InicioSesionService,
    private toast: ToastrService
  ){}

  contrasenasValidas(): boolean {
    return !!(this.nuevaContrasena && this.confirmarContrasena && this.nuevaContrasena === this.confirmarContrasena);
  }


  guardarDatos() {
    const formData = {
      oldPassword: this.contrasenaAntigua,
      newPassword: this.nuevaContrasena
    }

    this.inicioSesionService.updatePwd(formData).subscribe(
      data => {
        if (data.response == 1){
          this.toast.success("La contraseña ha sido actualizada.", "Success!");
        }
        else if (data.response == 0) this.toast.error("La contraseña antigua no es correcta.", "Error!");
      }
    )
  }
}
