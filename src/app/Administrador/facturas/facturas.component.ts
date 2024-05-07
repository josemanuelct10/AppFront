import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../Services/facturas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit {

  facturas: any;
  filtro: string;
  id: number;
  referencia: string;

  constructor(
    private facturasService: FacturasService,
    private toast: ToastrService
  ){}


  ngOnInit(): void {
    this.facturasService.getAll().subscribe(
      facturas => this.facturas = facturas
    )
  }

  setFacturaAEliminar(id: number, referencia: string){
    this.id = id;
    this.referencia = referencia;
  }


  actualizarFacturas(facturasActualizadas: any){
    this.facturas = facturasActualizadas;
  }

  limpiarFiltro() {
    this.filtro = '';
  }

  abrirDocumento(id: number) {
    this.facturasService.getDocumento(id).subscribe((response: Blob) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }



  calcularTotalFiltrado(): number {
    let total = 0;
    for (let i = 0; i < this.facturas.length; i++){
      if (this.pasaFiltro(this.facturas[i])){
        total += this.facturas[i].precioFactura;
      }
    }
    return total;
  }

  pasaFiltro(gasto: any): boolean{
    if (!this.filtro){
      return true;
    }
    const searchText = this.filtro.toLowerCase();
    return (
      gasto.descripcion.toLowerCase().includes(searchText) ||
      gasto.cantidad.toString().toLowerCase().includes(searchText) ||
      gasto.fecha.toString().toLowerCase().includes(searchText) ||
      gasto.referencia.toLowerCase().includes(searchText)
    );
  }



}
