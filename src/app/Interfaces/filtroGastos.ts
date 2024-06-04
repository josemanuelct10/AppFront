import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterGastos"
})

export class FiltroGastos implements PipeTransform {
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
        (item.user && (item.user.name.toLowerCase().includes(searchText))) || // Nombre del usuario o campo "Involucrado"
        (item.proveedor && item.proveedor.nombre.toLowerCase().includes(searchText)) || // Nombre del proveedor
        item.cantidad.toString().toLowerCase().includes(searchText)
      );
    });
  }
}





