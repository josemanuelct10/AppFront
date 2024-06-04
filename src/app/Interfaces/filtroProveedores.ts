import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterProveedores"
})

export class FiltroProveedores implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Verificar si algún campo coincide con el texto de búsqueda
      return (
        item.nombre.toString().toLowerCase().includes(searchText) ||
        item.telefono.toString().toLowerCase().includes(searchText) ||
        item.direccion.toString().toLowerCase().includes(searchText) ||
        item.cif.toString().toLowerCase().includes(searchText)
      );
    });
  }
}
