import { Component } from '@angular/core';
import { PescadoServiceService } from '../../../Services/pescado-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pescado',
  templateUrl: './add-pescado.component.html',
  styleUrls: ['./add-pescado.component.css']
})
export class AddPescadoComponent {
  constructor(
    private pescadoService: PescadoServiceService,
    private router: Router
  ) {
    this.fechaCompra = new Date();
  }

  nombre: string;
  descripcion: string;
  origen: string;
  precioKG: number;
  cantidad: number;
  fechaCompra: Date;
  categoria: string;
  imagen: string | null = null;

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
      formData.append('fechaCompra', this.fechaCompra.toISOString());
    }

    formData.append('categoria', this.categoria);
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }

    console.log(formData);

    this.pescadoService.add(formData).subscribe(data => {
      alert("Pescado guardado correctamente.");
      console.log(data);
      this.pescadoService.notificarActualizacion();
    });
  }

}
