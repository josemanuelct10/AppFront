import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../Services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit  {

  ventas: any;
  id: number;
  referencia: string;
  filtro: string;

  constructor(
    private ventasService: VentasService
  ){}

  ventasActualizadas(ventasActualizadas: any){
    this.ventas = ventasActualizadas;
  }


  ngOnInit(): void {
    this.ventasService.getAll().subscribe(
      data => {
        this.ventas = data;
      }
    )
  }

  setVentaAEliminar(id: number, referencia: string){
    this.id = id,
    this.referencia = referencia;
  }

  limpiarFiltro() {
    this.filtro = '';
  }

  calcularTotalFiltrado(): number {
    let total = 0;
    for (let i = 0; i < this.ventas.length; i++) {
      if (this.pasaFiltro(this.ventas[i])) {
        total += this.ventas[i].cantidad;
      }
    }
    return parseFloat(total.toFixed(2)); // Limitar a dos decimales y convertir de nuevo a número
  }


  pasaFiltro(venta: any): boolean{
    if (!this.filtro){
      return true;
    }
    const searchText = this.filtro.toLowerCase();
    return (
      venta.descripcion.toLowerCase().includes(searchText) ||
      venta.cantidad.toString().toLowerCase().includes(searchText) ||
      venta.fecha.toString().toLowerCase().includes(searchText) ||
      venta.referencia.toLowerCase().includes(searchText)
    );
  }




}
