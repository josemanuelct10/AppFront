import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../Services/facturas.service';
import { InicioSesionService } from '../../Services/inicio-sesion.service';

@Component({
  selector: 'app-facturas-usuario',
  templateUrl: './facturas-usuario.component.html',
  styleUrl: './facturas-usuario.component.css' // Debería ser styleUrls, no styleUrl
})
export class FacturasUsuarioComponent implements OnInit {

  facturas: any; // Almacena las facturas del usuario
  usuario: any; // Almacena los datos del usuario
  constructor(
    private facturasService: FacturasService, // Servicio para gestionar las facturas
    private inicioSesionService: InicioSesionService // Servicio para gestionar el inicio de sesión
  ){}

  ngOnInit(): void {
    const idUser = parseInt(localStorage.getItem('idUsuario') || '');

    // Obtener las facturas del usuario actual
    this.facturasService.getByUsuario(idUser).subscribe(
      (data: any) => {
        this.facturas = data.facturas; // Almacenar las facturas recibidas del servicio
      }
    )
  }

  // Abrir el documento PDF de una factura
  abrirDocumento(id: number) {
    this.facturasService.getDocumento(id).subscribe((response: Blob) => {
      // Convertir la respuesta en un objeto Blob
      const file = new Blob([response], { type: 'application/pdf' });
      // Crear una URL para el objeto Blob
      const fileURL = URL.createObjectURL(file);
      // Abrir una nueva ventana con el documento PDF
      window.open(fileURL, '_blank');
    });
  }

}
