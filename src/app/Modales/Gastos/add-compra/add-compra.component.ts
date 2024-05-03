import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProveedoresServiceService } from '../../../Services/proveedores-service.service';
import { GastosServiceService } from '../../../Services/gastos-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-compra',
  templateUrl: './add-compra.component.html',
  styleUrl: './add-compra.component.css'
})
export class AddCompraComponent implements OnInit {

  @Output() onChange = new EventEmitter<any>();


  constructor(
    private proveedorService: ProveedoresServiceService,
    private gastosService: GastosServiceService,
    private toast: ToastrService
  ){}

  proveedores: any;
  descripcion: string;
  cantidad: number;
  fecha: Date;
  proveedor_id: number;
  referencia: string;
  archivoSeleccionado: File | null = null;


  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }


  ngOnInit(): void {
    this.proveedorService.getAll().subscribe(
      proveedores => {
        this.proveedores =proveedores;
        console.log(this.proveedores);
      }
    )
  }

  guardarDatos(){
    console.log(this.fecha);
    let fechaString = this.fecha.toString();

    // Conversion del Documento a Base64
    if (this.archivoSeleccionado){
      const reader = new FileReader();

      reader.onload = () => {
        const documentoBase64 = reader.result as string;

        console.log(documentoBase64);

        const formData = {
          proveedor_id: this.proveedor_id,
          referencia: "COM-" + fechaString.replace(/-/g, '') + "-" + this.proveedor_id,
          descripcion: this.descripcion,
          cantidad: this.cantidad,
          documento: documentoBase64,
          fecha: this.fecha
        }

        this.gastosService.add(formData).subscribe(
          data => {
            console.log(data);
            if (data.success === true){
              this.gastosService.getAll().subscribe(
                datos => {
                  this.onChange.emit(datos);
                  this.toast.success("Nómina añadida correctamente.", "Success!");
                }
              )
            }
          },
          (error) => {
            this.toast.error("Error al añadir la nómina.", "Error!");
          }
        )

        console.log(formData);

      };
      reader.readAsDataURL(this.archivoSeleccionado);
    }
    else {
      console.error("No se selecciono ningun archivo.");
    }
  }
  }





