import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterProducto"
})

export class FiltroProductos implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log(items);
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      console.log(item);
      // Verificar si algún campo coincide con el texto de búsqueda
      return (
        item.nombre.toString().toLowerCase().includes(searchText) ||
        item.cantidad.toString().toLowerCase().includes(searchText) ||
        item.precioKG.toString().toLowerCase().includes(searchText)
      );
    });
  }
}





