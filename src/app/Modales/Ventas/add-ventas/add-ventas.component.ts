import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../Services/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrls: ['./add-ventas.component.css']
})
export class AddVentasComponent implements OnInit {

  formVenta: FormGroup;
  opciones: string[] = ['BAENA', 'DOÑA MENCÍA'];
  seleccion: string;

  constructor(
    private formBuilder: FormBuilder,
    private ventasService: VentasService,
    private toast: ToastrService,
    public modal: NgbActiveModal
  ){
    // Formulario para la entrada de datos de la venta
    this.formVenta = formBuilder.group({
      selectPesc: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  ngOnInit(): void {}

  // Método para actualizar la descripción basada en la opción seleccionada
  onChangeOpcion() {
    const seleccion = this.formVenta.get('selectPesc')?.value;
    if (seleccion) {
      this.formVenta.get('descripcion')?.setValue(`Venta de ${seleccion}`);
    } else {
      this.formVenta.get('descripcion')?.setValue('');
    }
  }

  // Método para guardar los datos de la venta
  guardarDatos(){
    let referencia: '';
    // Genera la referencia basada en la opción seleccionada y la fecha
    if (this.formVenta.get('selectPesc')?.value == "BAENA"){
      referencia = "VEN-BAE-" + this.formVenta.get('fecha')?.value;
    }
    else{
      referencia = "VEN-DOM-" + this.formVenta.get('fecha')?.value;
    }

    // Construye el objeto formData con los datos de la venta
    const formData = {
      descripcion: this.formVenta.get('descripcion')?.value,
      fecha: this.formVenta.get('fecha')?.value,
      referencia: referencia,
      cantidad: this.formVenta.get('cantidad')?.value
    }

    // Llama al método del servicio para agregar la venta
    this.ventasService.add(formData).subscribe(
      data => {
        if (data.success == true){
          // Se recargan todas las ventas y se cierra el modal
          this.ventasService.getAll().subscribe(
            ventasActualizadas => {
              this.modal.close(ventasActualizadas);
              this.toast.success("Venta añadida correctamente.", "Success!");
            }
          )
        }
        else if (data.success === false && data.response == 0){
          this.toast.error("Ya ha creado una venta con esa referencia hoy.", "Error!");
        }
      }
    )
  }
}
