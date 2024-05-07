import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from '../../Services/usuarios-service.service';
import { CategoriaUsuariosService } from '../../Services/categoria-usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: any;
  usuario: any;
  id: any;
  nombre: string;

  constructor(
    private usuariosService: UsuariosServiceService,
  ){}

  actualizarProveedores(usuariosActualizados: any){
    this.usuarios = usuariosActualizados;
  }

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }

  buscarUsuario(id: any){
    this.usuariosService.getById(id).subscribe(data=> {
      this.usuario = data;
    })
  }

  setUsuarioAEliminar(id: any, name: any){
    this.id = id;
    this.nombre = name;
  }
}
