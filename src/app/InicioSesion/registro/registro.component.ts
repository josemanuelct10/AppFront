import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor (
    private inicioSesion: InicioSesionService,
    private router: Router,
    private toast: ToastrService
    ){}

  nombre: string;
  email: string;
  dni: string;
  password: string;
  fechaNacimiento: Date;
  telefono: string;
  direccion: string;
  categoria_usuario: number = 2;

  onSubmit(){
    const formData = {
      name: this.nombre,
      email: this.email,
      dni: this.dni,
      password: this.password,
      fecha_nacimiento: this.fechaNacimiento,
      telefono: this.telefono,
      direccion: this.direccion,
      categoria_usuario_id: this.categoria_usuario
    }

    console.log(formData);

    this.inicioSesion.registro(formData)
      .subscribe(response => {
        this.toast.success("Se ha registrado correctamente.", "Success!");
        console.log(response);
        this.router.navigate(['/']);


      }, error => {
        alert("Error al registrarsse");
      })
  }
}
