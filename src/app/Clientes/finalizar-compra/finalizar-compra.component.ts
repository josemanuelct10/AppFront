import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from '../../Services/facturas.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css' // Debería ser styleUrls, no styleUrl
})
export class FinalizarCompraComponent implements OnInit {

  facturaId: number; // Almacena el ID de la factura
  factura: any; // Almacena los detalles de la factura

  constructor(
    private route: ActivatedRoute, // Servicio para obtener los parámetros de la ruta
    private facturaService: FacturasService // Servicio para gestionar las facturas
  ){}

  ngOnInit(): void {
    // Obtener el parámetro 'facturaId' de la URL
    this.route.queryParams.subscribe(params => {
      this.facturaId = params['facturaId'];
      console.log(params['facturaId']); // Puedes utilizar facturaId según sea necesario
    });

    // Obtener los detalles de la factura utilizando el ID obtenido
    this.facturaService.getById(this.facturaId).subscribe(
      (data: any) => {
        this.factura = data.factura; // Almacenar los detalles de la factura
        console.log(data);
      }
    )
  }

  // Abrir el documento PDF de la factura
  abrirDocumento() {
    this.facturaService.getDocumento(this.facturaId).subscribe((response: Blob) => {
      // Convertir la respuesta en un objeto Blob
      const file = new Blob([response], { type: 'application/pdf' });
      // Crear una URL para el objeto Blob
      const fileURL = URL.createObjectURL(file);
      // Abrir una nueva ventana con el documento PDF
      window.open(fileURL, '_blank');
    });
  }

}
