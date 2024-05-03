import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosServiceService } from '../../../Services/usuarios-service.service';
import { GastosServiceService } from '../../../Services/gastos-service.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-nomina',
  templateUrl: './add-nomina.component.html',
  styleUrl: './add-nomina.component.css'
})
export class AddNominaComponent implements OnInit {

  @Output() onChange = new EventEmitter<any>();

  trabajadores: any;
  descripcion: string;
  cantidad: number;
  fecha: Date;
  trabajador_id: number;
  referencia: string;
  archivoSeleccionado: File | null = null;


  constructor(
    private usuariosService: UsuariosServiceService,
    private gastosService: GastosServiceService,
    private toast: ToastrService
  ){
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }


  ngOnInit(): void {
    forkJoin({
      categoria1: this.usuariosService.getByCategoria(2),
      categoria2: this.usuariosService.getByCategoria(1)
    }).subscribe({
      next: (resultados: { categoria1: any, categoria2: any }) => {
        this.trabajadores = [...resultados.categoria1, ...resultados.categoria2];
        console.log(this.trabajadores);
      },
      error: (error) => {
        console.error('Error al obtener trabajadores:', error);
      }
    });
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
          trabajador_id: this.trabajador_id,
          referencia: "NOM-" + fechaString.replace(/-/g, '') + "-" + this.trabajador_id,
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
