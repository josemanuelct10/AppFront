import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrl: './menu-dashboard.component.css'
})
export class MenuDashboardComponent {

  categoriaUsuario: number = 0; // Valor predeterminado


  constructor(
    private inicioSesionService: InicioSesionService,
    private router: Router
  ){
    const categoriaUsuarioStr = localStorage.getItem('categoriaUsuario');
    if (categoriaUsuarioStr) {
      this.categoriaUsuario = parseInt(categoriaUsuarioStr);
    }
  }

  logout(){
    this.inicioSesionService.logout();
    this.router.navigate(['']);
  }

}
