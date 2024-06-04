import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterFacturas"
})

export class FiltroFacturas implements PipeTransform {
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
        item.id.toString().toLowerCase().includes(searchText) ||
        item.fecha.toString().toLowerCase().includes(searchText) ||
        item.referencia.toLowerCase().includes(searchText) ||
        item.user.name.toLowerCase().includes(searchText) || // Nombre del usuario o campo "Involucrado"
        item.precioFactura.toString().toLowerCase().includes(searchText)
      );
    });
  }
}





