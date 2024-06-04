import { Component, OnInit } from '@angular/core';
import { ProveedoresServiceService } from '../../Services/proveedores-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RmProveedorComponent } from '../../Modales/Proveedores/rm-proveedor/rm-proveedor.component';
import { ShowProveedorComponent } from '../../Modales/Proveedores/show-proveedor/show-proveedor.component';
import { EditProveedorComponent } from '../../Modales/Proveedores/edit-proveedor/edit-proveedor.component';
import { AddProveedorComponent } from '../../Modales/Proveedores/add-proveedor/add-proveedor.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class ProveedoresComponent implements OnInit {

  proveedores: any; // Variable para almacenar los proveedores
  proveedor: any; // Variable para almacenar un proveedor individual
  id: any; // Variable para almacenar el ID del proveedor seleccionado
  nombre: string; // Variable para almacenar el nombre del proveedor seleccionado
  page: number; // Variable para el número de página actual
  filtro: string; // Variable para el filtro de búsqueda

  constructor(
    private proveedoresService: ProveedoresServiceService, // Servicio para gestionar los proveedores
    public modalService: NgbModal // Servicio para abrir modales
  ){}

  // Método para actualizar la lista de proveedores después de alguna operación
  actualizarProveedores(proveedoresActualizados: any){
    this.proveedores = proveedoresActualizados;
  }

  ngOnInit(): void {
    // Obtener todos los proveedores al inicializar el componente
    this.proveedoresService.getAll().subscribe(data  => {
      this.proveedores = data; // Asignar los proveedores obtenidos a la variable proveedores
      console.log(this.proveedores);
    });
  }

  // Método para abrir un modal y confirmar la eliminación de un proveedor
  modalRM(id: number, nombre: string){
    const modalRef: NgbModalRef = this.modalService.open(RmProveedorComponent, {size: 'xs', centered: true })

    modalRef.componentInstance.id = id; // Pasar el ID del proveedor seleccionado al componente del modal
    modalRef.componentInstance.nombre = nombre; // Pasar el nombre del proveedor seleccionado al componente del modal

    // Actualizar los proveedores después de confirmar la eliminación
    modalRef.result.then((result) =>{
      console.log(result);
      this.proveedores = result;
    });
  }

  // Método para abrir un modal y mostrar los detalles de un proveedor
  modalShow(proveedor: any){
    const modalRef: NgbModalRef = this.modalService.open(ShowProveedorComponent, {size: 'lg', centered: true })

    modalRef.componentInstance.proveedor = proveedor; // Pasar el proveedor seleccionado al componente del modal
  }

  // Método para abrir un modal y editar un proveedor
  modalEdit(proveedor: any){
    const modalRef: NgbModalRef = this.modalService.open(EditProveedorComponent, {size: 'lg', centered: true })

    modalRef.componentInstance.proveedor = proveedor; // Pasar el proveedor seleccionado al componente del modal

    // Actualizar los proveedores después de confirmar la edición
    modalRef.result.then((result) =>{
      console.log(result);
      this.proveedores = result;
    });
  }

  // Método para abrir un modal y agregar un nuevo proveedor
  modalAdd(){
    const modalRef: NgbModalRef = this.modalService.open(AddProveedorComponent, {size: 'lg', centered: true })

    // Actualizar los proveedores después de agregar un nuevo proveedor
    modalRef.result.then((result) =>{
      console.log(result);
      this.proveedores = result;
    });
  }

  // Método para limpiar el filtro de búsqueda
  limpiarFiltro() {
    this.filtro = '';
  }

}
