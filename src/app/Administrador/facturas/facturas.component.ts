import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../Services/facturas.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RmFacturaComponent } from '../../Modales/Facturas/rm-factura/rm-factura.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class FacturasComponent implements OnInit {

  facturas: any; // Variable para almacenar las facturas
  filtro: string; // Variable para el filtro de búsqueda
  id: number; // Variable para almacenar el ID de la factura seleccionada para eliminar
  referencia: string; // Variable para almacenar la referencia de la factura seleccionada para eliminar
  page: number; // Variable para el número de página actual

  constructor(
    private facturasService: FacturasService, // Servicio para gestionar las facturas
    private toast: ToastrService, // Servicio para mostrar notificaciones
    public modalService: NgbModal // Servicio para abrir modales
  ){}

  ngOnInit(): void {
    // Al inicializar el componente, obtener todas las facturas
    this.facturasService.getAll().subscribe(
      (data: any) => {
        this.facturas = data.data; // Asignar las facturas obtenidas a la variable facturas
      }
    );
  }

  rmModal(factura: any){
    const modalRef: NgbModalRef = this.modalService.open(RmFacturaComponent, {size: 'xs', centered: true })

    modalRef.componentInstance.factura = factura; // Pasar el nombre del marisco seleccionado al componente del modal

    modalRef.result.then((result) =>{
      console.log(result, "aaaaa");
      this.facturas = result;
    });
  }



  // Función para limpiar el filtro de búsqueda
  limpiarFiltro() {
    this.filtro = ''; // Asignar una cadena vacía al filtro
  }

  // Función para abrir el documento PDF de una factura
  abrirDocumento(id: number) {
    this.facturasService.getDocumento(id).subscribe((response: Blob) => {
      // Convertir la respuesta a un objeto Blob
      const file = new Blob([response], { type: 'application/pdf' });
      // Crear una URL para el Blob
      const fileURL = URL.createObjectURL(file);
      // Abrir el documento en una nueva pestaña del navegador
      window.open(fileURL, '_blank');
    });
  }

  // Función para calcular el total de las facturas filtradas
  calcularTotalFiltrado(): number {
    let total = 0;
    for (let i = 0; i < this.facturas.length; i++){
      if (this.pasaFiltro(this.facturas[i])){
        total += this.facturas[i].precioFactura;
      }
    }
    return total;
  }


  // Función para determinar si una factura pasa el filtro de búsqueda
  pasaFiltro(factura: any): boolean{
    if (!this.filtro){
      return true; // Si el filtro está vacío, todas las facturas pasan
    }
    // Convertir el texto del filtro y los campos de la factura a minúsculas y comprobar si coinciden
    const searchText = this.filtro.toLowerCase();
    return (
      factura.id.toString().toLowerCase().includes(searchText) ||
      factura.fecha.toString().toLowerCase().includes(searchText) ||
      factura.referencia.toLowerCase().includes(searchText) ||
      factura.user.name.toLowerCase().includes(searchText) || // Nombre del usuario o campo "Involucrado"
      factura.precioFactura.toString().toLowerCase().includes(searchText)
    );
  }

}
