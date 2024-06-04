import { Component, OnInit } from '@angular/core';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ShowMariscoComponent } from '../../Modales/Marisco/show-marisco/show-marisco.component';
import { EditMariscoComponent } from '../../Modales/Marisco/edit-marisco/edit-marisco.component';
import { RmMariscoComponent } from '../../Modales/Marisco/rm-marisco/rm-marisco.component';

export interface Marisco {
  id: number;
  // Otros campos del objeto marisco
}

@Component({
  selector: 'app-marisco',
  templateUrl: './marisco.component.html',
  styleUrls: ['./marisco.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})


export class MariscoComponent implements OnInit {

  mariscos: any; // Variable para almacenar los mariscos
  marisco: any; // Variable para almacenar un marisco individual
  id: any; // Variable para almacenar el ID del marisco seleccionado
  nombre: string; // Variable para almacenar el nombre del marisco seleccionado
  page: number; // Variable para el número de página actual

  filtro: string;

  constructor(
    private mariscoService: MariscoServiceService, // Servicio para gestionar los mariscos
    private toast: ToastrService, // Servicio para mostrar notificaciones
    public modalService: NgbModal // Servicio para abrir modales
  ){
    // Al inicializar el componente, obtener todos los mariscos
    this.mariscoService.getAll().subscribe(data  => {
      this.mariscos = data; // Asignar los mariscos obtenidos a la variable mariscos
      console.log(this.mariscos);
    });
  }


  // Función para actualizar los mariscos después de una operación de edición o eliminación
  actualizarMariscos(mariscosActualizados: any){
    this.mariscos = mariscosActualizados; // Actualizar el arreglo de mariscos con los datos actualizados
  }

  ngOnInit(): void {

  }


  // Función para abrir un modal y mostrar los detalles de un marisco
  showMarisco(marisco: any){
    const modalRef: NgbModalRef = this.modalService.open(ShowMariscoComponent, {size: 'lg', centered: true })

    modalRef.componentInstance.marisco = marisco; // Pasar el marisco seleccionado al componente del modal
  }

  // Función para abrir un modal y confirmar la eliminación de un marisco
  rmMarisco(id: number, nombre: string){
    const modalRef: NgbModalRef = this.modalService.open(RmMariscoComponent, {size: 'xs', centered: true })

    modalRef.componentInstance.id = id; // Pasar el ID del marisco seleccionado al componente del modal
    modalRef.componentInstance.nombre = nombre; // Pasar el nombre del marisco seleccionado al componente del modal

    // Actualizar los mariscos después de confirmar la eliminación
    modalRef.result.then((result) =>{
      console.log(result);
      this.mariscos = result;
    });
  }

  // Función para abrir un modal y editar un marisco
  editMarisco(marisco: any){
    const modalRef: NgbModalRef = this.modalService.open(EditMariscoComponent, {size: 'lg', centered: true });

    modalRef.componentInstance.marisco = marisco; // Pasar el marisco seleccionado al componente del modal

    // Actualizar los mariscos después de confirmar la edición
    modalRef.result.then((result) =>{
      console.log(result);
      this.mariscos = result;
    });
  }

    // Función para limpiar el filtro de búsqueda
    limpiarFiltro() {
      this.filtro = '';
    }
}
