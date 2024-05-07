import { Component, OnInit, Pipe } from '@angular/core';
import { GastosServiceService } from '../../Services/gastos-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})

export class GastosComponent implements OnInit {


  actualizarGastos(gastosActualizados: any){
    this.gastos = gastosActualizados;
  }
  gastos: any;
  id: any;
  referencia: string;
  filtro: string;



  constructor(
    private gastosService: GastosServiceService,
    private toast: ToastrService
  ){}


  ngOnInit(): void {
    this.gastosService.getAll().subscribe(
      gastos => {
        this.gastos = gastos;
        console.log(this.gastos);
      }
    )
  }

  setGastoAEliminar(id: number, referencia: string){
    this.id = id;
    this.referencia = referencia;
  }


  calcularGastos(): number {

    let total = 0; // Inicializa la variable total en 0

    for (let i = 0; i < this.gastos.length; i++) {
      total += this.gastos[i].cantidad;
    }

    return total;
  }

  abrirDocumento(nombreArchivo: string){
    this.gastosService.getDocumento(nombreArchivo).subscribe(
      (documento: Blob) => {
        const url = window.URL.createObjectURL(documento);

        window.open(url);


      },
      (error) => {
        this.toast.error("Error al abrir el documento.", "Error!");
      }
    )
  }

  calcularTotalFiltrado(): number {
    let total = 0;
    for (let i = 0; i < this.gastos.length; i++){
      if (this.pasaFiltro(this.gastos[i])){
        total += this.gastos[i].cantidad;
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


  limpiarFiltro() {
    this.filtro = '';
  }

}
