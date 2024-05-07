import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GestionLineasService } from '../../../Services/gestion-lineas.service';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { MariscoServiceService } from '../../../Services/marisco-service.service';

@Component({
  selector: 'app-add-linea',
  templateUrl: './add-linea.component.html',
  styleUrl: './add-linea.component.css'
})
export class AddLineaComponent implements OnInit  {

  @Output() actualizarLineas = new EventEmitter<any>();


  pescados: any;
  mariscos: any;
  producto: any;


  descripcion: string;
  cantidad: number;
  precioKG:  number;
  producto_id: number;
  opciones: string[] = ['Pescado', 'Marisco'];
  seleccion: string;
  preparacion: string;
  precioLinea: number;


  constructor(

    private lineaService: GestionLineasService,
    private pescadosService: PescadoServiceService,
    private mariscosService: MariscoServiceService
  ){}


  ngOnInit(): void {
    this.pescadosService.getAll().subscribe(
      data => {
        this.pescados = data;
        console.log("AAAAA", this.pescados);
      }
    );

    this.mariscosService.getAll().subscribe(
      data => {
        this.mariscos = data;
      }
    )
  }

  guardarDatos(){
    if (this.seleccion == "Pescado"){

      const formData = {
        descripcion: this.descripcion,
        cantidad: this.cantidad,
        precioLinea: this.cantidad * this.precioKG,
        precioKG: this.precioKG,
        pescado: this.producto,
        preparacion: this.preparacion
      }

      this.lineaService.addLinea(formData); // Agregar la línea de manera síncrona
      let lineas = this.lineaService.getLineas();
      console.log(lineas);
      this.actualizarLineas.emit(lineas);
    }

    else {
      const formData = {
        descripcion: this.descripcion,
        cantidad: this.cantidad,
        precioLinea: this.cantidad * this.precioKG,
        precioKG: this.precioKG,
        marisco: this.producto,
        preparacion: this.preparacion
      }

      this.lineaService.addLinea(formData); // Agregar la línea de manera síncrona
      let lineas = this.lineaService.getLineas();
      console.log(lineas);
      this.actualizarLineas.emit(lineas);
    }

  }

  onChangeOpcion(): boolean{
    if (this.seleccion == "Pescado"){
      return false;
    }
    else{
      return true;
    }
  }

  onChange() {
    if (this.seleccion == "Pescado") {
      this.pescadosService.getById(this.producto_id).subscribe(
        data => {
          this.producto = data;
        }
      );
      this.precioKG = this.producto.precioKG;
      console.log(this.producto);
    }
    else {
      this.mariscosService.getById(this.producto_id).subscribe(
        data => {
          this.producto = data;
        }
      );
      this.precioKG = this.producto.precioKG;
    }

  }



}
