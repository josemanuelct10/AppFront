// Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { PescadoServiceService } from '../../Services/pescado-service.service';
import { MariscoServiceService } from '../../Services/marisco-service.service';
import { Route, Router } from '@angular/router';

// Componente para el buscador de productos
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnInit {
  // Lista de productos
  productos: any;
  // Término de búsqueda del usuario
  query: string = '';
  // Lista de sugerencias de búsqueda
  suggestions: any[] = [];
  // Subject para gestionar los términos de búsqueda
  private searchTerms = new Subject<string>();

  constructor(
    private pescadosService: PescadoServiceService,
    private mariscosService: MariscoServiceService,
    private route: Router
  ) {
    // Al recibir un término de búsqueda, esperar 300ms antes de actuar
    // y asegurarse de que los términos de búsqueda consecutivos sean distintos
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // Cambiar al servicio de búsqueda de sugerencias cuando el término cambie
      switchMap((term: string) => this.fetchSuggestions(term))
    ).subscribe((suggestions: any[]) => this.suggestions = suggestions);
  }

  ngOnInit(): void {
    // Obtener todos los pescados y mariscos al inicializar el componente
    this.pescadosService.getAll().subscribe(
      pescados => {
        this.productos = pescados;
        this.mariscosService.getAll().subscribe(
          mariscos => {
            if (Array.isArray(mariscos)) { // Verificar si mariscos es un array
              // Agregar los mariscos al array de productos
              this.productos.push(...mariscos);
            }
          },
          error => {
            console.error('Error al obtener los mariscos:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener los pescados:', error);
      }
    );
  }

  // Método para enviar el término de búsqueda
  onSearch(): void {
    this.searchTerms.next(this.query);
  }

  // Método para obtener las sugerencias de búsqueda
  fetchSuggestions(term: string): Observable<any[]> {
    if (term.length < 3) {
      return of([]); // Devolver un Observable vacío si el término es muy corto
    }
    // Filtrar los productos que coincidan con el término de búsqueda
    const filteredSuggestions = this.productos.filter((product: any) =>
      product.nombre.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredSuggestions); // Devolver las sugerencias de búsqueda
  }

  // Método para navegar a los detalles del producto seleccionado
  navigateToDetail(suggestion: any) {
    // Determinar la categoría del producto (pescado o marisco) basándose en la propiedad 'cocido'
    const category = suggestion.cocido !== undefined && suggestion.cocido !== null ? 'marisco' : 'pescado';
    // Navegar a la ruta de los detalles del producto con la categoría y el ID del producto
    this.route.navigate(['/detalleProducto', category, suggestion.id]);
  }
}
