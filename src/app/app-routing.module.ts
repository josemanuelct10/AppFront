import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './InicioSesion/registro/registro.component';
import { InicioSesionComponent } from './InicioSesion/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './Administrador/inicio/inicio.component';
import { PescadoComponent } from './Administrador/Pescado/pescado/pescado.component';
import { MariscoComponent } from './Administrador/marisco/marisco.component';
import { ProductosComponent } from './Administrador/productos/productos.component';
import { ProveedoresComponent } from './Administrador/proveedores/proveedores.component';
import { CategoriasUsuariosComponent } from './Administrador/categorias-usuarios/categorias-usuarios.component';
import { UsuariosComponent } from './Administrador/usuarios/usuarios.component';

const routes: Routes = [
  {path: '', component: InicioSesionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'administrador/inicio', component: InicioComponent},
  {path: 'administrador/pescado', component: PescadoComponent},
  {path: 'administrador/marisco', component: MariscoComponent},
  {path: 'administrador/productos', component: ProductosComponent},
  {path: 'administrador/proveedores', component: ProveedoresComponent},
  {path: 'administrador/categorias_usuarios', component: CategoriasUsuariosComponent},
  {path: 'administrador/usuarios', component: UsuariosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
