import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { Time } from '@angular/common';
import { FacturasService } from '../../Services/facturas.service';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { PescadoServiceService } from '../../Services/pescado-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit  {

  productosCarrito: any;
  horaRecogida: Time;

  constructor(
    private carritoService: CarritoService,
    private toast: ToastrService,
    private facturasService: FacturasService,
    private mariscoService: MariscoServiceService,
    private pescadoService: PescadoServiceService
  ){}

  ngOnInit(): void {
    let idUser: number = parseInt(localStorage.getItem('idUsuario') || '');

    this.carritoService.comprobacionCarrito(idUser).subscribe(
      (data: any) => {
        if (data.response == 1){
          this.productosCarrito = data.carrito.lineas;
          console.log(this.productosCarrito);
        }
        else {
          console.log(data.message);
        }

      }
    )
  }

  calcularTotalFiltrado(): number {
    let total = 0;
    for (let i = 0; i < this.productosCarrito.length; i++){
        total += this.productosCarrito[i].precioLinea;

    }
    return total;
  }

  eliminarProducto(id: number){
    this.carritoService.rmLinea(id).subscribe(
      data => {
        if (data.response == 1){
          this.toast.success("Producto eliminado del carrito correctamente!", "Eliminacion correcta.");
          this.ngOnInit();
        }
      }
    )
  }

  finalizarCompra() {
    for (let i = 0; i < this.productosCarrito.length; i++){
      this.actualizacionProductos(this.productosCarrito[i]);
    }
  }

  actualizacionProductos(linea: any){
    let nuevaCantidad: number;

    if (linea.marisco){
      this.mariscoService.getById(linea.marisco.id).subscribe(
        (data: any) => {
          if (data.cantidad < linea.cantidad){
            console.log(data);
            this.toast.error("La cantidad del producto es superior a la que disponemos.", "Error!");
          }else {
            nuevaCantidad = data.cantidad - linea.cantidad;
            this.mariscoService.updateCantidad(linea.marisco.id, nuevaCantidad).subscribe(
              data => {
                if (data.response == 1){
                  console.log("Cantidad de Marisco Actualizada");
                }
              }
            );
          }
        }
      )

    }else {
      // Comprobacion de si la cantidad de la  linea no es superior a la del producto
      this.pescadoService.getById(linea.pescado.id).subscribe(
        (data: any) => {
          if (data.cantidad < linea.cantidad){
            this.toast.error("La cantidad del producto es superior a la que disponemos.", "Error!");
          }
          else{
            nuevaCantidad = data.cantidad - linea.cantidad;
            this.pescadoService.updateCantidad(linea.pescado.id, nuevaCantidad).subscribe(
              data => {
                if (data.response == 1){
                  console.log("Cantidad de Pescado Actualizada");
                }
              }
            );
          }
        }
      )
    }
  }
}
