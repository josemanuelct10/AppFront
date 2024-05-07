import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MariscoServiceService } from '../../../Services/marisco-service.service';
import { ToastrService } from 'ngx-toastr';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';

@Component({
  selector: 'app-add-marisco',
  templateUrl: './add-marisco.component.html',
  styleUrl: './add-marisco.component.css'
})
export class AddMariscoComponent implements OnInit {

  mariscos: any;
  @Output() onChange = new EventEmitter<any>();


  nombre: string;
  descripcion: string;
  origen: string;
  precioKG: number;
  cantidad: number;
  fechaCompra: Date;
  categoria: string;
  cocido: boolean = false;
  imagen: string | null = null;
  user_id = localStorage.getItem('idUsuario');
  proveedor_id: number;

  proveedores: any;

  capturarImagen(event: any): void {
    this.imagen = event.target.files[0];
    console.log(event.target.files)
  }

  constructor(
    private mariscoService: MariscoServiceService,
    private toastr: ToastrService,
    private proveedorService: ProveedoresServiceService
  ){
    this.fechaCompra = new Date();
  }
  ngOnInit(): void {
    this.proveedorService.getAll().subscribe(
      data => {
        this.proveedores = data;
        console.log(this.proveedores);
      }
    )
  }

  guardarDatos(){

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('origen', this.origen);
    formData.append('precioKG', this.precioKG.toString());
    formData.append('cantidad', this.cantidad.toString());
    formData.append('categoria', this.categoria);
    formData.append('cocido', this.cocido ? '1' : '0');

    if (this.fechaCompra instanceof Date) {
      this.fechaCompra = new Date(this.fechaCompra.getFullYear(), this.fechaCompra.getMonth(), this.fechaCompra.getDate());
      console.log("AAAA", this.fechaCompra);
      formData.append('fechaCompra', this.fechaCompra.toISOString());
    }
    if (this.imagen) {
      console.log("AAAA");
      formData.append('imagen', this.imagen);
    }

    const userIdFromStorage = localStorage.getItem('idUsuario');
    if (userIdFromStorage !== null){
      this.user_id = userIdFromStorage;
      formData.append('user_id', this.user_id);
    }

    formData.append('proveedor_id', this.proveedor_id.toString());

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    this.mariscoService.add(formData).subscribe(
      data => {
        console.log(data);
        if (data.success === true){
          this.mariscoService.getAll().subscribe(data =>{
            this.mariscos = data;
            this.onChange.emit(this.mariscos);
            console.log(this.mariscos);
            this.toastr.success("Marisco añadido correctamente", "Success!");
          });
        }
      },
      error => {
        console.log("AAA", error);
        this.toastr.error("Ocurrió un error al añadir el marisco", "Error");
        console.error("Error al añadir el marisco:", error);
      }
    );

  }
}
