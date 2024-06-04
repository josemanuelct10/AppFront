import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterUsuarios"
})

export class FiltroUsuarios implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Verificar si algún campo coincide con el texto de búsqueda
      return (
        item.id.toString().toLowerCase().includes(searchText) ||
        item.name.toLowerCase().includes(searchText) || // Nombre del usuario o campo "Involucrado"
        item.email.toLowerCase().includes(searchText) ||
        item.telefono.toLowerCase().includes(searchText) ||
        item.categoria_usuario.descripcion.toLowerCase().includes(searchText)
      );
    });
  }
}





