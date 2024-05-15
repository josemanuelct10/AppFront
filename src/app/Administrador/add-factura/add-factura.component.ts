import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from '../../Services/usuarios-service.service';
import { GestionLineasService } from '../../Services/gestion-lineas.service';
import { FacturasService } from '../../Services/facturas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrl: './add-factura.component.css'
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
  ){
    this.usuariosService.getAll().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }
  ngOnInit(): void {
    this.lineasFactura = this.lineasService.getLineas();
    console.log(this.lineasFactura);
  }

  actualizarLineas(lineasActualizadas: any){
    this.lineasFactura = lineasActualizadas;
    console.log(this.lineasFactura);
  }


  guardarDatos(){
    let fechaString = this.fecha.toString();
    console.log(fechaString);


    for (let i = 0; i < this.lineasFactura.length; i++){
      this.totalFactura += this.lineasFactura[i].precioLinea;
      console.log(this.lineasFactura[i].precioLinea);
      console.log(this.totalFactura);
    }

    const formData = {
      referencia: "FAC-" + fechaString.replace(/-/g, '') + "-" + this.user_id + "-" + uuidv4(),
      fecha: this.fecha,
      precioFactura: this.totalFactura,
      horaRecogida: null,
      metodoPago: this.metodoPago,
      user_id: this.user_id
    }



    this.facturasService.add(formData).subscribe(
      data => {
        if (data.response == 1){
          console.log(data);
          for(let i = 0; i < this.lineasFactura.length; i++){
            if (this.lineasFactura[i].pescado){
              const formData = {
                descripcion: this.lineasFactura[i].descripcion,
                cantidad: this.lineasFactura[i].cantidad,
                precioLinea: this.lineasFactura[i].precioLinea,
                precioUnitario: this.lineasFactura[i].precioKG,
                factura_id: data.data.id,
                pescado_id: this.lineasFactura[i].pescado.id
              }

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
                descripcion: this.lineasFactura[i].descripcion,
                cantidad: this.lineasFactura[i].cantidad,
                precioLinea: this.lineasFactura[i].precioLinea,
                precioUnitario: this.lineasFactura[i].precioKG,
                factura_id: data.data.id,
                marisco_id: this.lineasFactura[i].marisco.id
              }

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
          this.router.navigate(['/administrador/facturas']);
          this.toast.success("Factura creada correctamente.", "Success!");
          this.lineasService.vaciarLineas();
        }
        else{
          this.toast.error("Error al crear la factura.", "Error!");
        }
      }
    )
  }
}
