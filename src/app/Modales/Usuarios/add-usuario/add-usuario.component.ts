import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriaUsuariosService } from '../../../Services/categoria-usuarios.service';
import { UsuariosServiceService } from '../../../Services/usuarios-service.service';
import { InicioSesionService } from '../../../Services/inicio-sesion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent implements OnInit {

  @Output() onChange = new EventEmitter<any>();


  nombre: string;
  email: string;
  password: string = "123";
  dni: string;
  fechaNacimiento: Date;
  direccion: string;
  telefono: string;
  categoria_usuario_id: number;


  categoriasUsuarios: any;

  constructor(
    private categoriasService: CategoriaUsuariosService,
    private usuarioService: UsuariosServiceService,
    private inicioSesion: InicioSesionService,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe(
      data => this.categoriasUsuarios = data
    )
  }


  guardarDatos(){
    const formData = {
      name: this.nombre,
      email: this.email,
      password: this.password,
      dni: this.dni,
      fecha_nacimiento: this.fechaNacimiento,
      telefono: this.telefono,
      direccion: this.direccion,
      categoria_usuario_id: this.categoria_usuario_id
    }

    this.inicioSesion.registro(formData).subscribe(
      data => {
        this.usuarioService.getAll().subscribe(
          data => {
            this.onChange.emit(data);
            this.toast.success("Usuario creado correctamente.", "Success!");
          }
        )
      }
    )
  }




}
