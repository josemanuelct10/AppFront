import { Component, EventEmitter, Output } from '@angular/core';
import { GastosServiceService } from '../../../Services/gastos-service.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-gastos-extra',
  templateUrl: './add-gastos-extra.component.html',
  styleUrl: './add-gastos-extra.component.css'
})
export class AddGastosExtraComponent {

  @Output() onChange = new EventEmitter<any>();


  descripcion: string;
  cantidad: number;
  documento: File | null;
  fecha: Date;
  archivoSeleccionado: File | null = null;


  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }


  constructor(
    public gastoService: GastosServiceService,
    private toast: ToastrService
  ){}


  guardarDatos() {
    let fechaString = this.fecha.toString();

    const formData = {
      referencia: "GASEXT-" + fechaString.replace(/-/g, '') + "-" + uuidv4(),
      descripcion: this.descripcion,
      cantidad: this.cantidad,
      documento: null as string | null, // Cambiar el tipo de documento
      fecha: this.fecha
    };

    if (this.archivoSeleccionado) {
      const reader = new FileReader();

      reader.onload = () => {
        formData.documento = reader.result as string; // Asignar el documento leído

        this.enviarGasto(formData); // Enviar el gasto con los datos completos
      };

      reader.readAsDataURL(this.archivoSeleccionado); // Leer el archivo seleccionado
    } else {
      this.enviarGasto(formData); // Enviar el gasto con el documento null
    }
  }

  enviarGasto(formData: any) {
    this.gastoService.add(formData).subscribe(
      data => {
        console.log(data);
        if (data.success === true) {
          this.gastoService.getAll().subscribe(
            gastosAct => {
              this.onChange.emit(gastosAct);
              this.toast.success("Gasto Extra añadido correctamente.", "Success!");
            }
          )
        }
      },
      (error) => {
        this.toast.error("Error al añadir el gasto extra.", "Error!");
      }
    );
  }




}
