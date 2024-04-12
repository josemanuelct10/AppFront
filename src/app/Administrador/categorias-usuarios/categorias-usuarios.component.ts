import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoriaUsuariosService } from '../../Services/categoria-usuarios.service';

@Component({
  selector: 'app-categorias-usuarios',
  templateUrl: './categorias-usuarios.component.html',
  styleUrl: './categorias-usuarios.component.css'
})

export class CategoriasUsuariosComponent implements OnInit {

  categoriasUsuarios: any;
  id: number;
  descripcion: string;

  constructor(
    private http: HttpClient,
    private categoriasService: CategoriaUsuariosService
  ){}

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe(data  => {
      this.categoriasUsuarios = data;
      console.log(this.categoriasUsuarios);
    });
  }

  setCategoriaAEliminar(id:any, descripcion: any){
    this.id = id;
    this.descripcion = descripcion;
  }

}
