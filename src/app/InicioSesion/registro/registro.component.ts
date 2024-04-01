import { Component } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor (
    private inicioSesion: InicioSesionService,
    private router: Router
    ){}

  nombre: string;
  email: string;
  dni: string;
  password: string;
  fechaNacimiento: Date;
  telefono: string;
  direccion: string;

  onSubmit(){
    const formData = {
      name: this.nombre,
      email: this.email,
      dni: this.dni,
      password: this.password,
      fecha_nacimiento: this.fechaNacimiento,
      telefono: this.telefono,
      direccion: this.direccion
    }

    this.inicioSesion.registro(formData)
      .subscribe(response => {
        alert('Se ha registrado correctamente.');
        this.router.navigate(['/']);

      }, error => {
        alert("Error al registrarsse");
      })
  }
}
