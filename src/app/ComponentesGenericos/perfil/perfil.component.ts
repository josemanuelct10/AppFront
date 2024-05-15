import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  categoriaUsuario: number;
  usuario: any;
  fechaRegistro: any;

  actualizarUsuario(usuarioActualizado: any){
    this.usuario = usuarioActualizado;

  }
  constructor(
    private inicioSesionService: InicioSesionService
  ){
    this.categoriaUsuario = parseInt(localStorage.getItem('categoriaUsuario') || '');

    this.inicioSesionService.getUserInfo().subscribe(
      data => {
        this.usuario = data.data;
        const fecha = new Date(this.usuario.created_at)
        this.fechaRegistro = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

        console.log(this.usuario);
      }
    )
  }

}
