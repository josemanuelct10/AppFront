import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid'; // Importa la función para generar UUID
import { Time } from '@angular/common';
import { FacturasService } from '../../Services/facturas.service';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  productosCarrito: any; // Almacena los productos en el carrito
  horaRecogida: Time; // Almacena la hora de recogida seleccionada
  facturaCreada: number; // Almacena el ID de la factura creada

  constructor(
    private carritoService: CarritoService,
    private toast: ToastrService,
    private facturasService: FacturasService,
    private mariscoService: MariscoServiceService,
    private pescadoService: PescadoServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    // Obtener el ID del usuario desde el almacenamiento local
    let idUser: number = parseInt(localStorage.getItem('idUsuario') || '');

    // Comprobar el carrito del usuario
    this.carritoService.comprobacionCarrito(idUser).subscribe(
      (data: any) => {
        if (data.response == 1){
          // Si el carrito existe, asignar los productos al arreglo
          this.productosCarrito = data.carrito.lineas;
          console.log(this.productosCarrito);
        }
        else {
          console.log(data.message); // Si no hay carrito, mostrar un mensaje
        }
      }
    );
  }

  // Calcular el total de la compra
  calcularTotalFiltrado(): number {
    let total = 0;
    for (let i = 0; i < this.productosCarrito.length; i++){
        total += this.productosCarrito[i].precioLinea;
    }
    return total;
  }

  // Eliminar un producto del carrito
  eliminarProducto(id: number){
    this.carritoService.rmLinea(id).subscribe(
      data => {
        if (data.response == 1){
          // Notificar que el producto ha sido eliminado correctamente
          this.toast.success("Producto eliminado del carrito correctamente!", "Eliminación correcta.");
          // Recargar los productos del carrito
          this.ngOnInit();
        }
      }
    );
  }

  // Finalizar la compra
  finalizarCompra() {

    // Validar la hora de recogida
    if (!this.validateHoraRecogida()){
      // Si la hora no es válida, mostrar un mensaje de error
      this.toast.error("La hora de recogida no es válida. La hora debe ser posterior a la actual. Horario de 08:00 a 15:30.", "Error!");
      return;
    }

    console.log(this.productosCarrito);

    // Agrupar los productos del carrito por tipo (pescado o marisco)
    const productosAgrupados: any = {};

    for (let i = 0; i < this.productosCarrito.length; i++) {
      const producto = this.productosCarrito[i];
      const id = producto.pescado ? producto.pescado.id : producto.marisco.id;
      const tipo = producto.pescado ? 'pescado' : 'marisco';

      if (!productosAgrupados[id]) {
        productosAgrupados[id] = { cantidad: 0, tipo: tipo };
      }
      productosAgrupados[id].cantidad += producto.cantidad;
    }

    let valid = true; // Variable para verificar si todos los productos están disponibles
    const keys = Object.keys(productosAgrupados);
    const comprobaciones = keys.map(key => {
      const id = parseInt(key);
      const grupo = productosAgrupados[id];

      if (grupo.tipo === 'pescado') {
        // Comprobar la disponibilidad de los pescados
        return this.pescadoService.getById(id).toPromise().then((data: any) => {
          if (data.cantidad < grupo.cantidad) {
            // Si la cantidad es insuficiente, mostrar un mensaje de error
            this.toast.error(`La cantidad del pescado ${data.nombre} es superior a la disponible.`, "Error!");
            valid = false; // Marcar como no válida la compra
          }
        });
      } else {
        // Comprobar la disponibilidad de los mariscos
        return this.mariscoService.getById(id).toPromise().then((data: any) => {
          if (data.cantidad < grupo.cantidad) {
            // Si la cantidad es insuficiente, mostrar un mensaje de error
            this.toast.error(`La cantidad del marisco ${data.nombre} es superior a la disponible.`, "Error!");
            valid = false; // Marcar como no válida la compra
          }
        });
      }
    });

    // Esperar a que todas las comprobaciones se completen
    Promise.all(comprobaciones).then(() => {
      if (valid) {
        // Si todos los productos están disponibles, crear la factura
        this.crearFactura();
      }
    });
  }

  // Crear una nueva factura
  crearFactura() {
    // Obtener el ID del usuario desde el almacenamiento local
    const idUser = parseInt(localStorage.getItem('idUsuario') || '');
    // Calcular el total de la compra
    const total = this.calcularTotalFiltrado();
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Formatear la fecha en formato ISO
    const fechaString = fechaActual.toISOString().split('T')[0];

    // Crear un objeto con los datos de la factura
    const formData = {
      referencia: "FAC-" + fechaString.replace(/-/g, '') + "-" + idUser + "-" + uuidv4(),
      fecha: fechaString,
      precioFactura: total,
      horaRecogida: this.horaRecogida,
      metodoPago: 'Metálico',
      user_id: idUser
    }

    // Agregar la factura a través del servicio
    this.facturasService.add(formData).subscribe(
      (factura: any) => {
        // Almacenar el ID de la factura creada
        this.facturaCreada = factura.data.id;
        // Actualizar los productos y eliminar el carrito
        const actualizaciones = this.productosCarrito.map((producto: any) => {
          this.actualizacionProductos(producto); // Actualizar las existencias del producto
          producto.factura_id = this.facturaCreada; // Asignar el ID de la factura
          producto.carrito_id = null; // Eliminar la referencia al carrito
          return this.carritoService.updateLineas(producto.id, producto).toPromise(); // Actualizar la línea del carrito
        });

        // Esperar a que todas las actualizaciones se completen
        Promise.all(actualizaciones).then(() => {
          // Una vez que todas las actualizaciones se han realizado con éxito, eliminar el carrito
          this.eliminarCarrito(idUser);
        });
      }
    );
  }

  // Eliminar el carrito del usuario
  eliminarCarrito(idUser: number) {
    this.carritoService.deleteCarrito(idUser).subscribe(
      (data) => {
        console.log("AAAAA", data);
        if (data.response == 1){
          // Notificar que la compra se ha finalizado con éxito
          this.toast.success("Compra finalizada con éxito!", "Éxito!");
          // Redirigir a la página de pedido finalizado y pasar el ID de la factura como parámetro
          this.router.navigate(['/carrito/pedidoFinalizado'], { queryParams: { facturaId: this.facturaCreada } });
          // Limpiar la lista de productos en el carrito
          this.productosCarrito = [];
        }
        else if (data.response == -2){
          // Si el carrito no se puede eliminar porque aún tiene productos, mostrar un mensaje de error
          this.toast.error("El carrito no puede ser eliminado porque tiene productos dentro. Póngase en contacto con el administrador.", "Error");
        } else if (data.response == -1){
          // Si no se encuentra ningún carrito para el usuario, mostrar un mensaje de error
          this.toast.error("No se ha encontrado ningún carrito para este usuario. Póngase en contacto con el administrador.", "Error");
        }
      }
    );
  }

  // Actualizar las existencias de los productos después de realizar una compra
  actualizacionProductos(linea: any) {
    let nuevaCantidad: number;

    if (linea.marisco){
      this.mariscoService.getById(linea.marisco.id).subscribe(
        (data: any) => {
          if (data.cantidad >= linea.cantidad){
            // Calcular la nueva cantidad disponible restando la cantidad comprada
            nuevaCantidad = data.cantidad - linea.cantidad;
            // Actualizar la cantidad de marisco en la base de datos
            this.mariscoService.updateCantidad(linea.marisco.id, nuevaCantidad).subscribe(
              data => {
                if (data.response == 1){
                  console.log("Cantidad de Marisco Actualizada");
                }
              }
            );
          }
        }
      );
    } else {
      this.pescadoService.getById(linea.pescado.id).subscribe(
        (data: any) => {
          if (data.cantidad >= linea.cantidad){
            // Calcular la nueva cantidad disponible restando la cantidad comprada
            nuevaCantidad = data.cantidad - linea.cantidad;
            // Actualizar la cantidad de pescado en la base de datos
            this.pescadoService.updateCantidad(linea.pescado.id, nuevaCantidad).subscribe(
              data => {
                if (data.response == 1){
                  console.log("Cantidad de Pescado Actualizada");
                }
              }
            );
          }
        }
      );
    }
  }

  // Validar la hora de recogida
  validateHoraRecogida(): boolean {
    const ahora = new Date();
    const horaActual = ahora.toTimeString().split(' ')[0]; // Obtener la hora actual en formato HH:mm:ss
    const horaSeleccionada = new Date(`1970-01-01T${this.horaRecogida}:00`); // Asegúrate de que this.horaRecogida esté en formato HH:mm

    // Validar si la hora seleccionada es posterior a la hora actual
    if (horaSeleccionada.toTimeString().split(' ')[0] <= horaActual) {
        return false;
    }

    // Validar si la hora seleccionada está dentro del horario permitido
    const horaInicio = new Date('1970-01-01T08:00:00'); // Ejemplo: 08:00 AM
    const horaFin = new Date('1970-01-01T18:00:00'); // Ejemplo: 06:00 PM

    if (horaSeleccionada < horaInicio || horaSeleccionada > horaFin) {
        return false;
    }

    // Validar que el día sea de martes a sábado
    const diaSemana = ahora.getUTCDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    if (diaSemana < 2 || diaSemana > 6) {
        return false;
    }

    // La hora y el día son válidos
    return true;
}

}
