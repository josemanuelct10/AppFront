import { Component, OnInit } from '@angular/core';
import { ProveedoresServiceService } from '../../Services/proveedores-service.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  proveedores: any;
  proveedor: any;
  id: any;
  nombre: string;



  constructor(
    private proveedoresService: ProveedoresServiceService
  ){}

  ngOnInit(): void {
    this.proveedoresService.getAll().subscribe(data  => {
      this.proveedores = data;
      console.log(this.proveedores);
    });
  }

  buscarProveedor(id: number){

  }

  setProveedorAEliminar(id: number, nombre: string){
    this.id = id;
    this.nombre = nombre;
  }

}
