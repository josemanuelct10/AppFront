import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';
import { CartResponse } from '../../Interfaces/interfaces';
import { PescadoServiceService } from '../../Services/pescado-service.service';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrl: './menu-cliente.component.css'
})
export class MenuClienteComponent implements OnInit{

  filtro: string;

  productosFiltrados: any[] = [];
  productos: any;

  constructor(
    private inicioSesionService: InicioSesionService,
    private router: Router,
    private carritoService: CarritoService,
    private pescadoService: PescadoServiceService
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
  ngOnInit(): void {
    this.pescadoService.getAll().subscribe(
      (data: any)=> {
        this.productos = data;
        this.productosFiltrados = this.productos;
      }
    )
  }

  filtrarProductos(): void {
    if (!this.filtro) {
      this.productosFiltrados = this.productos;
    } else {
      const textoFiltro = this.filtro.toLowerCase();
      this.productosFiltrados = this.productos.filter((producto: any) =>
        Object.values(producto).some(val => {
          if (val !== null && val !== undefined) {
            return val.toString().toLowerCase().includes(textoFiltro);
          }
          return false;
        })
      );
    }
  }


  nProductos: number;


  logout(){
    this.inicioSesionService.logout();
    this.router.navigate(['']);
  }

}
