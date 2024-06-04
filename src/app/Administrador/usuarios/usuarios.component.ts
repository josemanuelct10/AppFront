import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from '../../Services/usuarios-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddUsuarioComponent } from '../../Modales/Usuarios/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from '../../Modales/Usuarios/edit-usuario/edit-usuario.component';
import { RmUsuarioComponent } from '../../Modales/Usuarios/rm-usuario/rm-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class UsuariosComponent implements OnInit {

  usuarios: any; // Variable para almacenar los usuarios
  usuario: any; // Variable para almacenar un usuario individual
  id: any; // Variable para almacenar el ID del usuario seleccionado
  nombre: string; // Variable para almacenar el nombre del usuario seleccionado
  page: number; // Variable para el número de página actual
  filtro: string; // Variable para el filtro de búsqueda

  constructor(
    private usuariosService: UsuariosServiceService, // Servicio para gestionar los usuarios
    public modalService: NgbModal // Servicio para abrir modales
  ){}

  // Método para actualizar la lista de usuarios después de alguna operación
  actualizarUsuarios(usuariosActualizados: any){
    this.usuarios = usuariosActualizados;
  }

  ngOnInit(): void {
    // Obtener todos los usuarios al inicializar el componente
    this.usuariosService.getAll().subscribe(data => {
      this.usuarios = data; // Asignar los usuarios obtenidos a la variable usuarios
      console.log(this.usuarios);
    });
  }

  // Método para abrir un modal y editar un usuario
  editModal(usuario: any){
    const modalRef: NgbModalRef = this.modalService.open(EditUsuarioComponent, {size: 'lg', centered: true })

    modalRef.componentInstance.usuario = usuario; // Pasar el usuario seleccionado al componente del modal

    // Actualizar los usuarios después de confirmar la edición
    modalRef.result.then((result) =>{
      console.log(result);
      this.usuarios = result;
    });
  }

  // Método para abrir un modal y eliminar un usuario
  rmModal(usuario: any){
    const modalRef: NgbModalRef = this.modalService.open(RmUsuarioComponent, {size: 'xs', centered: true });

    modalRef.componentInstance.usuario = usuario; // Pasar el usuario seleccionado al componente del modal

    // Actualizar los usuarios después de confirmar la eliminación
    modalRef.result.then((result) =>{
      console.log(result);
      this.usuarios = result;
    });
  }

  // Método para limpiar el filtro de búsqueda
  limpiarFiltro() {
    this.filtro = '';
  }

  // Método para abrir un modal y agregar un nuevo usuario
  modalAdd(){
    const modalRef: NgbModalRef = this.modalService.open(AddUsuarioComponent, {size: 'lg', centered: true });

    // Actualizar los usuarios después de agregar un nuevo usuario
    modalRef.result.then((result) =>{
      console.log(result);
      this.usuarios = result;
    });
  }
}
