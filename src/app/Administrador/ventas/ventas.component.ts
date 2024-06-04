import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../Services/ventas.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddVentasComponent } from '../../Modales/Ventas/add-ventas/add-ventas.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class VentasComponent implements OnInit  {

  ventas: any; // Variable para almacenar las ventas
  id: number; // Variable para almacenar el ID de la venta seleccionada
  referencia: string; // Variable para almacenar la referencia de la venta seleccionada
  filtro: string; // Variable para el filtro de búsqueda
  page: number; // Variable para el número de página actual

  constructor(
    private ventasService: VentasService, // Servicio para gestionar las ventas
    public modalService: NgbModal // Servicio para abrir modales
  ){}

  // Método para actualizar la lista de ventas después de alguna operación
  ventasActualizadas(ventasActualizadas: any){
    this.ventas = ventasActualizadas;
  }

  ngOnInit(): void {
    // Obtener todas las ventas al inicializar el componente
    this.ventasService.getAll().subscribe(data => {
      this.ventas = data; // Asignar las ventas obtenidas a la variable ventas
    });
  }

  // Método para establecer la venta que se eliminará
  setVentaAEliminar(id: number, referencia: string){
    this.id = id;
    this.referencia = referencia;
  }

  // Método para limpiar el filtro de búsqueda
  limpiarFiltro() {
    this.filtro = '';
  }

  // Método para calcular el total de las ventas filtradas
  calcularTotalFiltrado(): number {
    let total = 0;
    for (let i = 0; i < this.ventas.length; i++) {
      if (this.pasaFiltro(this.ventas[i])) {
        total += this.ventas[i].cantidad;
      }
    }
    return parseFloat(total.toFixed(2)); // Limitar a dos decimales y convertir de nuevo a número
  }

  // Método para verificar si una venta pasa el filtro de búsqueda
  pasaFiltro(venta: any): boolean{
    if (!this.filtro){
      return true;
    }
    const searchText = this.filtro.toLowerCase();
    return (
      venta.descripcion.toLowerCase().includes(searchText) ||
      venta.cantidad.toString().toLowerCase().includes(searchText) ||
      venta.fecha.toString().toLowerCase().includes(searchText) ||
      venta.referencia.toLowerCase().includes(searchText)
    );
  }

  // Método para abrir el modal de agregar venta
  modalAdd(){
    const modalRef: NgbModalRef = this.modalService.open(AddVentasComponent, {size: 'lg', centered: true })

    // Actualizar las ventas después de agregar una nueva venta
    modalRef.result.then((result) =>{
      console.log(result);
      this.ventas = result;
    });
  }
}
