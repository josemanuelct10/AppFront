import { HttpClient } from '@angular/common/http'; // Importar el módulo HttpClient para hacer solicitudes HTTP
import { Component, OnInit } from '@angular/core';
import { CategoriaUsuariosService } from '../../Services/categoria-usuarios.service';

@Component({
  selector: 'app-categorias-usuarios',
  templateUrl: './categorias-usuarios.component.html',
  styleUrls: ['./categorias-usuarios.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})

export class CategoriasUsuariosComponent implements OnInit {

  categoriasUsuarios: any; // Variable para almacenar las categorías de usuarios
  id: number; // Variable para almacenar el ID de la categoría seleccionada para eliminar
  descripcion: string; // Variable para almacenar la descripción de la categoría seleccionada para eliminar

  constructor(
    private http: HttpClient, // Inyectar HttpClient para hacer solicitudes HTTP
    private categoriasService: CategoriaUsuariosService // Inyectar el servicio de categorías de usuarios
  ){}

  ngOnInit(): void {
    // Al inicializar el componente, obtener todas las categorías de usuarios
    this.categoriasService.getAll().subscribe(data  => {
      this.categoriasUsuarios = data; // Asignar los datos obtenidos al arreglo de categorías
      console.log(this.categoriasUsuarios);
    });
  }

  // Función para establecer la categoría que se va a eliminar
  setCategoriaAEliminar(id:any, descripcion: any){
    this.id = id; // Asignar el ID de la categoría a la variable id
    this.descripcion = descripcion; // Asignar la descripción de la categoría a la variable descripcion
  }

  // Función para actualizar las categorías después de una operación de eliminación u otra modificación
  actualizarCategorias(categoriasActualizadas: any){
    this.categoriasUsuarios = categoriasActualizadas; // Actualizar el arreglo de categorías con los datos actualizados
  }
}
