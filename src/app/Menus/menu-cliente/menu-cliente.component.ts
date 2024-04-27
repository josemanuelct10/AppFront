import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrl: './menu-cliente.component.css'
})
export class MenuClienteComponent {

  constructor(
    private inicioSesionService: InicioSesionService,
    private router: Router
  ){}

  logout(){
    this.inicioSesionService.logout();
    this.router.navigate(['']);
  }

}
