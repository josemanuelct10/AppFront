import { Component, OnInit } from '@angular/core';
import { GastosServiceService } from '../../Services/gastos-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})

export class GastosComponent implements OnInit {

  gastos: any; // Variable para almacenar los gastos
  id: any; // Variable para almacenar el ID del gasto seleccionado para eliminar
  referencia: string; // Variable para almacenar la referencia del gasto seleccionado para eliminar
  filtro: string; // Variable para el filtro de búsqueda
  page: number; // Variable para el número de página actual

  constructor(
    private gastosService: GastosServiceService, // Servicio para gestionar los gastos
    private toast: ToastrService // Servicio para mostrar notificaciones
  ){}


  ngOnInit(): void {
    // Al inicializar el componente, obtener todos los gastos
    this.gastosService.getAll().subscribe(
      gastos => {
        this.gastos = gastos; // Asignar los gastos obtenidos a la variable gastos
        console.log(this.gastos);
      }
    );
  }

  // Función para establecer el gasto que se va a eliminar
  setGastoAEliminar(id: number, referencia: string){
    this.id = id; // Asignar el ID del gasto a la variable id
    this.referencia = referencia; // Asignar la referencia del gasto a la variable referencia
  }

  // Función para calcular el total de los gastos
  calcularGastos(): number {
    let total = 0; // Inicializa la variable total en 0

    for (let i = 0; i < this.gastos.length; i++) {
      total += this.gastos[i].cantidad; // Sumar la cantidad de cada gasto al total
    }

    return total;
  }

  // Función para abrir el documento asociado a un gasto
  abrirDocumento(nombreArchivo: string){
    this.gastosService.getDocumento(nombreArchivo).subscribe(
      (documento: Blob) => {
        const url = window.URL.createObjectURL(documento); // Crear una URL para el documento

        window.open(url); // Abrir el documento en una nueva pestaña del navegador
      },
      (error) => {
        this.toast.error("Error al abrir el documento.", "Error!"); // Mostrar un mensaje de error si falla la operación
      }
    );
  }

  // Función para calcular el total de los gastos filtrados
  calcularTotalFiltrado(): number {
    let total = 0;
    // Iterar sobre los gastos y sumar las cantidades de los que pasan el filtro
    for (let i = 0; i < this.gastos.length; i++){

      if (this.pasaFiltro(this.gastos[i])){

        total += this.gastos[i].cantidad;
      }
    }
    return total;
  }

  actualizarGastos(gastosActualizados: any){
    this.gastos = gastosActualizados;
  }

  // Función para determinar si un gasto pasa el filtro de búsqueda
  pasaFiltro(gasto: any): boolean {
    if (!this.filtro) {
      return true; // Si no hay filtro, mostrar todos los gastos
    }

    const searchText = this.filtro.toLowerCase();

    // Verificar si algún campo coincide con el texto de búsqueda
    return (
      gasto.descripcion.toLowerCase().includes(searchText) ||
      gasto.fecha.toString().toLowerCase().includes(searchText) ||
      gasto.referencia.toLowerCase().includes(searchText) ||
      (gasto.user && gasto.user.name.toLowerCase().includes(searchText)) ||
      (gasto.proveedor && gasto.proveedor.nombre.toLowerCase().includes(searchText)) ||
      gasto.cantidad.toString().toLowerCase().includes(searchText)
    );
  }

  // Función para limpiar el filtro de búsqueda
  limpiarFiltro() {
    this.filtro = '';
  }

}
