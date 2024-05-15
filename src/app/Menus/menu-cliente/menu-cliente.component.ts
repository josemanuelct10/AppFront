import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';
import { CartResponse } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrl: './menu-cliente.component.css'
})
export class MenuClienteComponent {

  constructor(
    private inicioSesionService: InicioSesionService,
    private router: Router,
    private carritoService: CarritoService
  ){
    let idUser: number = parseInt(localStorage.getItem('idUsuario') || '');

    if (!isNaN(idUser)) {
      this.carritoService.comprobacionCarrito(idUser).subscribe(
        (data: any) => {
          if (data.response == 1){
            this.nProductos = data.lineasCarrito;
          }
        }
      );
    } else {
      // Manejar el caso en que el ID del usuario no sea válido
      console.error('El ID del usuario no es válido');
    }
  }

  nProductos: number;


  logout(){
    this.inicioSesionService.logout();
    this.router.navigate(['']);
  }

}
