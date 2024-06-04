import { Component, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  id: string | null; // Almacena el ID del producto
  tipo: string | null; // Almacena el tipo del producto (pescado o marisco)

  comprar: boolean = true; // Variable para controlar si se muestra el botón de compra

  producto: any; // Almacena los datos del producto

  preparacion: string; // Almacena la descripción de la preparación
  cantidad: number = 0; // Almacena la cantidad seleccionada por el usuario

  constructor(
    private mariscoService: MariscoServiceService, // Servicio para obtener datos de mariscos
    private pescadoService: PescadoServiceService, // Servicio para obtener datos de pescados
    private route: ActivatedRoute, // Servicio para acceder a los parámetros de la ruta
    private carritoService: CarritoService, // Servicio para manejar el carrito de compras
    private toast: ToastrService, // Servicio para mostrar notificaciones
    private router: Router, // Servicio para navegar a otras rutas
  ){ }

  ngOnInit(): void {
    // Observa los cambios en los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      // Obtiene el ID y el tipo del producto de los parámetros de la ruta
      this.id = params.get('id');
      this.tipo = params.get('tipo');

      // Obtiene los datos del producto según su tipo (pescado o marisco)
      if (this.tipo === "pescado") {
        this.pescadoService.getById(this.id).subscribe(
          pescado => {
            this.producto = pescado;
          }
        );
      } else {
        this.mariscoService.getById(this.id).subscribe(
          marisco => {
            this.producto = marisco;
          }
        );
      }
    });
  }

  // Método para agregar el producto al carrito de compras
  guardarDatos(producto: any): void {
    // Verifica si la cantidad seleccionada es válida
    if (this.cantidad <= 0){
      this.toast.error("La cantidad debe ser superior a 0 KG!", "Error!");
      return;
    }
    if (this.cantidad > producto.cantidad) {
      this.toast.error("La cantidad seleccionada es mayor a la disponible.", "Error");
      return; // Salir del método si la cantidad no es válida
    }

    // Construye los datos de la línea del carrito
    const datosLinea = {
      descripcion: this.preparacion,
      cantidad: this.cantidad,
      precioLinea: this.cantidad * producto.precioKG,
      precioUnitario: producto.precioKG,
      carrito_id: null,
      pescado_id: null,
      marisco_id: null
    }

    // Obtiene el ID del usuario almacenado en el almacenamiento local
    let idUser: number = parseInt(localStorage.getItem('idUsuario') || '');

    // Comprueba si el usuario tiene un carrito activo
    this.carritoService.comprobacionCarrito(idUser).subscribe(
      (data: any) => {
        if (data.response == 1) { // Si el usuario tiene un carrito activo
          datosLinea.carrito_id = data.carrito.id;
          if (this.tipo === "pescado") {
            datosLinea.pescado_id = producto.id;
          } else {
            datosLinea.marisco_id = producto.id;
          }
          // Agrega la línea de producto al carrito
          this.carritoService.addLinea(datosLinea).subscribe(
            data => {
              if (data.response == 1) { // Si la línea se agrega con éxito
                this.router.navigate(['/carrito']); // Redirige al usuario al carrito de compras
                this.toast.success(producto.nombre + " añadido correctamente a la cesta.", "Añadido con éxito!");
              } else { // Si la línea no se agrega correctamente
                this.toast.error(producto.nombre + " no se ha podido añadir a la cesta.", "Error!");
              }
            }
          )
        } else { // Si el usuario no tiene un carrito activo
          const formData = { user_id: idUser };
          // Crea un nuevo carrito para el usuario
          this.carritoService.add(formData).subscribe(
            data => {
              if (data.response == 1) { // Si se crea el carrito con éxito
                datosLinea.carrito_id = data.data.id;
                if (this.tipo === "pescado") {
                  datosLinea.pescado_id = producto.id;
                } else {
                  datosLinea.marisco_id = producto.id;
                }
                // Agrega la línea de producto al carrito
                this.carritoService.addLinea(datosLinea).subscribe(
                  data => {
                    if (data.response == 1) { // Si la línea se agrega con éxito
                      this.router.navigate(['/carrito']); // Redirige al usuario al carrito de compras
                      this.toast.success(producto.nombre + " añadido correctamente a la cesta.", "Añadido con éxito!");
                    } else { // Si la línea no se agrega correctamente
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
}
