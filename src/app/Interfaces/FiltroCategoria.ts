import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCategoria'
})
export class FiltroCategoriaPipe implements PipeTransform {
  transform(productos: any[], categoriaSeleccionada: string): any[] {
    if (!categoriaSeleccionada || categoriaSeleccionada === 'todas') {
      return productos; // Si no se ha seleccionado una categoría o se ha seleccionado 'todas', devolver todos los productos
    } else {
      return productos.filter(producto => producto.categoria === categoriaSeleccionada); // Filtrar los productos según la categoría seleccionada
    }
  }
}
