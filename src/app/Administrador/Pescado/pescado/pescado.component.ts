import { Component, OnInit } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddPescadoComponent } from '../../../Modales/Pescado/add-pescado/add-pescado.component';
import { EditPescadoComponent } from '../../../Modales/Pescado/edit-pescado/edit-pescado.component';
import { ShowPescadoComponent } from '../../../Modales/Pescado/show-pescado/show-pescado.component';
import { RmPescadoComponent } from '../../../Modales/Pescado/rm-pescado/rm-pescado.component';

@Component({
  selector: 'app-pescado',
  templateUrl: './pescado.component.html',
  styleUrls: ['./pescado.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class PescadoComponent implements OnInit {
  pescados: any; // Variable para almacenar los pescados
  id: any; // Variable para almacenar el ID del pescado seleccionado
  nombre: string; // Variable para almacenar el nombre del pescado seleccionado
  page: number; // Variable para el número de página actual

  filtro: string;

  constructor(
    private pescadosService: PescadoServiceService, // Servicio para gestionar los pescados
    public modalService: NgbModal // Servicio para abrir modales
  ) {}


  ngOnInit(): void {
    // Al inicializar el componente, obtener todos los pescados
    this.pescadosService.getAll().subscribe(data  => {
      this.pescados = data; // Asignar los pescados obtenidos a la variable pescados
      console.log(">>>>",this.pescados);
    });
  }

  // Función para abrir un modal y editar un pescado
  modalEdit(pescado: any){
    const modalRef: NgbModalRef = this.modalService.open(EditPescadoComponent, {size: 'lg', centered: true })

    modalRef.componentInstance.pescado = pescado; // Pasar el pescado seleccionado al componente del modal

    // Actualizar los pescados después de confirmar la edición
    modalRef.result.then((result) =>{
      console.log(result);
      this.pescados = result;
    });
  }

  // Función para abrir un modal y mostrar los detalles de un pescado
  modalShow(pescado: any){
    const modalRef: NgbModalRef = this.modalService.open(ShowPescadoComponent, {size: 'lg', centered: true })

    modalRef.componentInstance.pescado = pescado; // Pasar el pescado seleccionado al componente del modal
  }

  // Función para abrir un modal y confirmar la eliminación de un pescado
  modalRm(id: number, nombre: string){
    const modalRef: NgbModalRef = this.modalService.open(RmPescadoComponent, {size: 'xs', centered: true })

    modalRef.componentInstance.id = id; // Pasar el ID del pescado seleccionado al componente del modal
    modalRef.componentInstance.nombre = nombre; // Pasar el nombre del pescado seleccionado al componente del modal

    // Actualizar los pescados después de confirmar la eliminación
    modalRef.result.then((result) =>{
      console.log(result);
      this.pescados = result;
    });
  }

  // Función para abrir un modal y agregar un nuevo pescado
  modalAdd(){
    const modalRef: NgbModalRef = this.modalService.open(AddPescadoComponent, {size: 'lg', centered: true });

    // Actualizar los pescados después de agregar un nuevo pescado
    modalRef.result.then((result) =>{
      console.log(result);
      this.pescados = result;
    });
  }

    // Función para limpiar el filtro de búsqueda
    limpiarFiltro() {
      this.filtro = '';
    }
}
