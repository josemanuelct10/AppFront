import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from '../../Services/inicio-sesion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private inicioSesion: InicioSesionService
    ){}



  onSubmit(){

    this.inicioSesion.login(this.email, this.password)
      .subscribe(response=>{
        localStorage.setItem('idUsuario',  response.user.id);
        localStorage.setItem('categoriaUsuario',  response.user.categoria_usuario_id);


        if (response.user.categoria_usuario_id === 1){
          this.router.navigate(['/administrador/inicio']);
        }
        else{
          this.router.navigate(['/inicio']);
        }


      }, error=> {
          // Manejar errores de inicio de sesión
          console.error('Error de inicio de sesión:', error);
          this.password = "";
          alert('Credenciales incorrectas');
      })

      console.log(this.password, this.email);


  }


}
