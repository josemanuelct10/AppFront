import { Component, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {

  id: string | null;
  tipo: string | null;

  comprar: boolean = true;


  producto: any;

  preparacion: string;
  cantidad: number = 0;

  constructor(
    private mariscoService: MariscoServiceService,
    private pescadoService: PescadoServiceService,
    private route: ActivatedRoute,
    private carritoService: CarritoService,
    private toast: ToastrService,
    private router: Router,
  ){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.tipo = params.get('tipo');
    });

    if (this.tipo === "pescado"){
      this.pescadoService.getById(this.id).subscribe(
        pescado => {
          this.producto = pescado;
        }
      )
    }
    else {
      this.mariscoService.getById(this.id).subscribe(
        marisco => {
          this.producto = marisco;
          console.log(this.producto);
        }
      )
    }

    this.comprobarProductoCarrito();

  }

  ngOnInit(): void {
  }

  guardarDatos(producto: any) {
    // Verificar si la cantidad es válida
    if (this.cantidad > producto.cantidad) {
      this.toast.error("La cantidad seleccionada es mayor a la disponible.", "Error");
      return; // Salir de la función si la cantidad no es válida
    }

    const datosLinea = {
      descripcion: this.preparacion,
      cantidad: this.cantidad,
      precioLinea: this.cantidad * producto.precioKG,
      precioUnitario: producto.precioKG,
      carrito_id: null,
      pescado_id: null,
      marisco_id: null
    }

    let idUser: number = parseInt(localStorage.getItem('idUsuario') || '');

    this.carritoService.comprobacionCarrito(idUser).subscribe(
      (data: any) => {
        if (data.response == 1) {
          datosLinea.carrito_id = data.carrito.id;
          if (this.tipo === "pescado") {
            datosLinea.pescado_id = producto.id;
          } else {
            datosLinea.marisco_id = producto.id;
          }
          this.carritoService.addLinea(datosLinea).subscribe(
            data => {
              if (data.response == 1) {
                this.router.navigate(['/carrito']);
                this.toast.success(producto.nombre + " añadido correctamente a la cesta.", "Añadido con exito!");
              } else {
                this.toast.error(producto.nombre + " no se ha podido añadir a la cesta.", "Error!");
              }
            }
          )
        } else {
          const formData = {
            user_id: idUser
          }
          this.carritoService.add(formData).subscribe(
            data => {
              if (data.response == 1) {
                console.log("Carrito Creado correctamente.");
                datosLinea.carrito_id = data.data.id;
                if (this.tipo === "pescado") {
                  datosLinea.pescado_id = producto.id;
                } else {
                  datosLinea.marisco_id = producto.id;
                }
                this.carritoService.addLinea(datosLinea).subscribe(
                  data => {
                    if (data.response == 1) {
                      this.router.navigate(['/carrito']);
                      this.toast.success(producto.nombre + " añadido correctamente a la cesta.", "Añadido con exito!");
                    } else {
                      this.toast.error(producto.nombre + " no se ha podido añadir a la cesta.", "Error!");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }


  comprobarProductoCarrito(){
    let idUser: number = parseInt(localStorage.getItem('idUsuario') || '');

    let tipoProductoCarrito;
    this.carritoService.comprobacionCarrito(idUser).subscribe(
      (data: any) => {
        console.log(data);
        for(let i = 0; i < data.carrito.lineas.length; i++) {

          console.log(data.carrito.lineas[i]);
          if (data.carrito.lineas[i] === this.producto){
            console.log("AAAA");
          }




        }
        console.log(this.comprar);
      }
    )
  }


}
