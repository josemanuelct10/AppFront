import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterVentas"
})

export class FilterVentas implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Verificar si algún campo coincide con el texto de búsqueda
      return (
        item.descripcion.toLowerCase().includes(searchText) ||
        item.fecha.toString().toLowerCase().includes(searchText) ||
        item.referencia.toLowerCase().includes(searchText) ||
        item.cantidad.toString().toLowerCase().includes(searchText)
      );
    });
  }
}
