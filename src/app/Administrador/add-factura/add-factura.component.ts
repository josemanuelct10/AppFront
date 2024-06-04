import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from '../../Services/usuarios-service.service';
import { GestionLineasService } from '../../Services/gestion-lineas.service';
import { FacturasService } from '../../Services/facturas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid'; // Importar función UUID
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddLineaComponent } from '../../Modales/Facturas/add-linea/add-linea.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrls: ['./add-factura.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class AddFacturaComponent implements OnInit {
  fecha: Date;
  usuarios: any;
  user_id: number;
  metodoPago: string = "Metalico";
  lineasFactura: any;
  totalFactura: number = 0;

  constructor(
    private usuariosService: UsuariosServiceService,
    private lineasService: GestionLineasService,
    private facturasService: FacturasService,
    private toast: ToastrService,
    private router: Router,
    public modalService: NgbModal
  ){
    // Obtener todos los usuarios y filtrarlos por categoría 2
    this.usuariosService.getAll().pipe(
      map((usuarios: any) => usuarios.filter((usuario:any) => usuario.categoria_usuario_id === 2))
    ).subscribe(
      usuariosFiltrados => {
        this.usuarios = usuariosFiltrados;
        console.log(this.usuarios);
      }
    );
  }

  ngOnInit(): void {
    // Obtener las líneas de factura al inicializar el componente
    this.lineasFactura = this.lineasService.getLineas();
    console.log(this.lineasFactura);
  }

  // Función para actualizar las líneas de factura
  actualizarLineas(lineasActualizadas: any){
    this.lineasFactura = lineasActualizadas;
    console.log(this.lineasFactura);
  }

  // Función para guardar los datos de la factura
  guardarDatos(){
    let fechaString = this.fecha.toString();
    console.log(fechaString);

    // Calcular el total de la factura sumando los precios de todas las líneas
    for (let i = 0; i < this.lineasFactura.length; i++){
      this.totalFactura += this.lineasFactura[i].precioLinea;
      console.log(this.lineasFactura[i].precioLinea);
      console.log(this.totalFactura);
    }

    // Construir el objeto formData con los datos de la factura
    const formData = {
      referencia: "FAC-" + fechaString.replace(/-/g, '') + "-" + this.user_id + "-" + uuidv4(),
      fecha: this.fecha,
      precioFactura: this.totalFactura,
      horaRecogida: null,
      metodoPago: this.metodoPago,
      user_id: this.user_id
    }

    // Añadir la factura a través del servicio de facturas
    this.facturasService.add(formData).subscribe(
      data => {
        if (data.response == 1){
          console.log(data);
          // Recorrer las líneas de factura y añadirlas al servidor
          for(let i = 0; i < this.lineasFactura.length; i++){
            if (this.lineasFactura[i].pescado){
              console.log(this.lineasFactura);
              const formData = {
                descripcion: this.lineasFactura[i].preparacion,
                cantidad: this.lineasFactura[i].cantidad,
                precioLinea: this.lineasFactura[i].precioLinea,
                precioUnitario: this.lineasFactura[i].precioKG,
                factura_id: data.data.id,
                pescado_id: this.lineasFactura[i].pescado.id
              }

              // Añadir línea de factura a través del servicio de líneas de factura
              this.lineasService.addLineaBD(formData).subscribe(
                data => {
                  console.log(data);
                  if (data.response == 1){
                  }
                  else this.toast.error("Error al crear la linea.", "Error!");
                }
              );
            }
            else {
              const formData = {
                descripcion: this.lineasFactura[i].preparacion,
                cantidad: this.lineasFactura[i].cantidad,
                precioLinea: this.lineasFactura[i].precioLinea,
                precioUnitario: this.lineasFactura[i].precioKG,
                factura_id: data.data.id,
                marisco_id: this.lineasFactura[i].marisco.id
              }

              // Añadir línea de factura a través del servicio de líneas de factura
              this.lineasService.addLineaBD(formData).subscribe(
                data => {
                  console.log(data);
                  if (data.response == 1){
                  }
                  else this.toast.error("Error al crear la linea.", "Error!");
                }
              );
            }
          }
          // Redirigir al usuario a la página de facturas y mostrar mensaje de éxito
          this.router.navigate(['/administrador/facturas']);
          this.toast.success("Factura creada correctamente.", "Success!");
          // Vaciar las líneas de factura después de guardar
          this.lineasService.vaciarLineas();
        }
        else{
          this.toast.error("Error al crear la factura.", "Error!");
        }
      }
    )
  }

  // Función para abrir el modal para agregar una línea de factura
  modalAdd(){
    const modalRef: NgbModalRef = this.modalService.open(AddLineaComponent, {size: 'lg', centered: true });

    // Actualizar las líneas de factura después de cerrar el modal
    modalRef.result.then((result) =>{
      console.log(result);
      this.lineasFactura = result;
    });
  }
}
