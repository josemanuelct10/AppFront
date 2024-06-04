import { Component, EventEmitter, Output } from '@angular/core';
import { GestionLineasService } from '../../../Services/gestion-lineas.service';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { MariscoServiceService } from '../../../Services/marisco-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-linea',
  templateUrl: './add-linea.component.html',
  styleUrls: ['./add-linea.component.css']
})
export class AddLineaComponent {

  @Output() actualizarLineas = new EventEmitter<any>(); // Evento para emitir cambios en las líneas

  pescados: any; // Lista de pescados
  mariscos: any; // Lista de mariscos
  producto: any; // Producto seleccionado

  formLinea: FormGroup; // Formulario para agregar una línea de pedido

  opciones: string[] = ['Pescado', 'Marisco']; // Opciones para el tipo de producto

  constructor(
    private formBuilder: FormBuilder, // Constructor de formularios
    private lineaService: GestionLineasService, // Servicio para gestionar líneas de pedido
    private pescadosService: PescadoServiceService, // Servicio para obtener pescados
    private mariscosService: MariscoServiceService, // Servicio para obtener mariscos
    public modal: NgbActiveModal // Servicio para manejar el modal
  ){
    // Obtener la lista de pescados
    this.pescadosService.getAll().subscribe(
      data => {
        this.pescados = data;
      }
    );

    // Obtener la lista de mariscos
    this.mariscosService.getAll().subscribe(
      data => {
        this.mariscos = data;
      }
    );

    // Construir el formulario de la línea de pedido con validadores
    this.formLinea = formBuilder.group({
      tipo: ['', Validators.required], // Tipo de producto requerido
      producto: ['', Validators.required], // Producto requerido
      cantidad: ['',[Validators.required, Validators.min(0.1)]], // Cantidad requerida y mayor que cero
      precioKG: ['',Validators.required], // Precio por kilogramo requerido
      preparacion: ['', Validators.required] // Preparación requerida
    })
  }

  guardarDatos(){
    // Método para guardar los datos de la línea de pedido

    let productoId = parseInt(this.formLinea.get('producto')?.value, 10); // Obtener el ID del producto seleccionado

    // Verificar si el tipo de producto es Pescado o Marisco
    if (this.formLinea.get('tipo')?.value == "Pescado"){

      const formData = {
        cantidad: this.formLinea.get('cantidad')?.value,
        precioLinea: this.formLinea.get('cantidad')?.value * this.formLinea.get('precioKG')?.value,
        precioKG: this.formLinea.get('precioKG')?.value,
        pescado: this.producto,
        preparacion: this.formLinea.get('preparacion')?.value
      }

      this.lineaService.addLinea(formData); // Agregar la línea de manera síncrona
      let lineas = this.lineaService.getLineas();
      console.log(lineas);
      this.modal.close(lineas); // Cerrar el modal y emitir las líneas actualizadas
    }

    else {
      const formData = {
        cantidad: this.formLinea.get('cantidad')?.value,
        precioLinea: this.formLinea.get('cantidad')?.value * this.formLinea.get('precioKG')?.value,
        precioKG: this.formLinea.get('precioKG')?.value,
        marisco: this.producto,
        preparacion: this.formLinea.get('preparacion')?.value
      }

      this.lineaService.addLinea(formData); // Agregar la línea de manera síncrona
      let lineas = this.lineaService.getLineas();
      console.log(lineas);
      this.modal.close(lineas); // Cerrar el modal y emitir las líneas actualizadas
    }
  }

  onChangeOpcion(): boolean{
    // Método para determinar si se ha seleccionado Pescado o Marisco
    if (this.formLinea.get('tipo')?.value == "Pescado"){
      return false; // Devuelve false si se selecciona Pescado
    }
    else{
      return true; // Devuelve true si se selecciona Marisco
    }
  }

  onChange() {
    // Método para obtener el producto seleccionado según el tipo (Pescado o Marisco)
    if (this.formLinea.get('tipo')?.value == "Pescado") {
      this.pescadosService.getById(this.formLinea.get('producto')?.value).subscribe(
        data => {
          this.producto = data; // Asignar el producto seleccionado
        }
      );
    }
    else {
      this.mariscosService.getById(this.formLinea.get('producto')?.value).subscribe(
        data => {
          this.producto = data; // Asignar el producto seleccionado
        }
      );
    }
  }
}
