import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  productos: any; // Arreglo que almacenará los productos

  ngOnInit(): void {
    // Obtener la categoría del usuario del almacenamiento local
    const categoriaUsuarioString = localStorage.getItem('categoriaUsuario');
    // Convertir la categoría del usuario a un número
    const categoriaUsuario = categoriaUsuarioString ? parseInt(categoriaUsuarioString, 10) : null;

    // Prefijo de la ruta en función de la categoría del usuario
    const prefix = categoriaUsuario === 1 || categoriaUsuario === 3 ? "/trabajador" : "";

    // Definir los productos con sus respectivas imágenes y enlaces
    this.productos = [
      { nombre: "Cefálopodos", imagen: "assets/logos/cefalopodos.jpg", imagen2: "assets/logos/sepia.jpg", enlace: prefix + "/marisco"},
      { nombre: 'Moluscos', imagen: "assets/logos/moluscos.jpg", imagen2: "assets/logos/almejas.jpg", enlace: prefix + "/marisco"},
      { nombre: 'Pescado Blanco', imagen: "assets/logos/pescadoBlanco.jpg", imagen2: "assets/logos/dorada.jpg", enlace: prefix + "/pescado"},
      { nombre: 'Pescado Azul', imagen: "assets/logos/pescadoAzul.jpg", imagen2: "assets/logos/sardinas.jpg", enlace: prefix + "/pescado"},
      { nombre: 'Crustáceos', imagen: "assets/logos/crustaceos.jpg", imagen2: "assets/logos/cigalas.jpg", enlace: prefix + "/marisco"},
    ];
  }
}
