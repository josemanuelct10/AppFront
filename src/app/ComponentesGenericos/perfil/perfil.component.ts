import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UpdtUsuarioComponent } from '../../Modales/Usuarios/updt-usuario/updt-usuario.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  // Variables principales
  categoriaUsuario: number; // Categoría del usuario
  usuario: any; // Información del usuario
  fechaRegistro: any; // Fecha de registro del usuario

  constructor(
    // Servicios necesarios para el componente
    private inicioSesionService: InicioSesionService, // Servicio de inicio de sesión
    public modalService: NgbModal // Servicio de modales
  ){
    // Inicialización de la categoría del usuario desde el almacenamiento local
    this.categoriaUsuario = parseInt(localStorage.getItem('categoriaUsuario') || '');

    // Obtención de información del usuario al inicializar el componente
    this.inicioSesionService.getUserInfo().subscribe(
      data => {
        // Almacenar información del usuario y formatear la fecha de registro
        this.usuario = data.data;
        const fecha = new Date(this.usuario.created_at)
        this.fechaRegistro = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

        // Loguear información del usuario en la consola
        console.log(this.usuario);
      }
    )
  }

  // Método para abrir el modal de actualización de usuario
  modalUpdt(){
    // Apertura del modal y paso de datos del usuario
    const modalRef: NgbModalRef = this.modalService.open(UpdtUsuarioComponent, {size: 'lg', centered: true })
    modalRef.componentInstance.usuario = this.usuario;

    // Manejo del resultado devuelto al cerrar el modal
    modalRef.result.then((result) =>{
      console.log(result); // Loguear el resultado en la consola
      this.usuario = result; // Actualizar la información del usuario con el resultado del modal
    });
  }
}
