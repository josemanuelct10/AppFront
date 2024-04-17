import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrl: './menu-dashboard.component.css'
})
export class MenuDashboardComponent {

  constructor(
    private inicioSesionService: InicioSesionService,
    private router: Router
  ){}

  logout(){
    this.inicioSesionService.logout();
    this.router.navigate(['']);
  }

}
