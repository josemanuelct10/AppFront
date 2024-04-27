import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pescado',
  templateUrl: './add-pescado.component.html',
  styleUrls: ['./add-pescado.component.css']
})
export class AddPescadoComponent implements OnInit  {

  @Output() onChange = new EventEmitter<any>();
  pescados: any;

  constructor(
    private pescadoService: PescadoServiceService,
    private proveedorService: ProveedoresServiceService,
    private toastr: ToastrService,
  ) {
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

  nombre: string;
  descripcion: string;
  origen: string;
  precioKG: number;
  cantidad: number;
  fechaCompra: Date;
  categoria: string;
  imagen: string | null = null;
  user_id = localStorage.getItem('idUsuario');
  proveedor_id: number;

  proveedores: any;


  capturarImagen(event: any): void {
    this.imagen = event.target.files[0];
    console.log(event.target.files)
  }

  guardarDatos(): void {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('origen', this.origen);
    formData.append('precioKG', this.precioKG.toString());
    formData.append('cantidad', this.cantidad.toString());

    // Validar si fechaCompra es un objeto de tipo Date
    if (this.fechaCompra instanceof Date) {
      console.log("AAA", this.fechaCompra);
      formData.append('fechaCompra', this.fechaCompra.toISOString());
    }

    formData.append('categoria', this.categoria);
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }


    const userIdFromStorage = localStorage.getItem('idUsuario');
    if (userIdFromStorage !== null){
      this.user_id = userIdFromStorage;
      formData.append('user_id', this.user_id);
    }

    formData.append('proveedor_id', this.proveedor_id.toString());


    console.log(formData);


    this.pescadoService.add(formData).subscribe(
      data => {
        if (data.success === true){
          this.pescadoService.getAll().subscribe(
            data =>{
              this.pescados = data;
              this.onChange.emit(this.pescados);
              console.log(this.pescados);
            }
          )
        }
        console.log(data);
        this.toastr.success("Pescado añadido correctamente", "Success!");
      },
      error => {
        console.log("AAA", error);
        this.toastr.error("Ocurrió un error al añadir el pescado", "Error");
        console.error("Error al añadir el pescado:", error);
      }
    );
  }

}
