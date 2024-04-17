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
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  {path: '', component: InicioSesionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'administrador/inicio', component: InicioComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/pescado', component: PescadoComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/marisco', component: MariscoComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/productos', component: ProductosComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/proveedores', component: ProveedoresComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/categorias_usuarios', component: CategoriasUsuariosComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/usuarios', component: UsuariosComponent, canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
