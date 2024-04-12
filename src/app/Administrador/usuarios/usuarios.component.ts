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

  constructor(
    private usuariosService: UsuariosServiceService,
    private categoriasService: CategoriaUsuariosService
  ){}

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(data => { // Asegúrate de que data sea un array de cualquier tipo
      this.usuarios = data;

      console.log(this.usuarios);
    });


  }

  buscarUsuario(id: any){}

  setUsuarioAEliminar(id: any, nombre: any){

  }


}
