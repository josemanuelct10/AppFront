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
import { GastosComponent } from './Administrador/gastos/gastos.component';
import { VentasComponent } from './Administrador/ventas/ventas.component';
import { FacturasComponent } from './Administrador/facturas/facturas.component';
import { AddFacturaComponent } from './Administrador/add-factura/add-factura.component';
import { ListaPescadosComponent } from './Clientes/lista-pescados/lista-pescados.component';
import { ListaMariscoComponent } from './Clientes/lista-marisco/lista-marisco.component';
import { ListaProductosComponent } from './Clientes/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './ComponentesGenericos/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './Clientes/carrito/carrito.component';
import { PerfilComponent } from './ComponentesGenericos/perfil/perfil.component';



const routes: Routes = [
  {path: '', component: InicioSesionComponent},
  {path: 'registro', component: RegistroComponent},
  { path: 'trabajador/inicio', component: InicioComponent, data: { menuType: 'dashboard' }, canActivate: [AuthGuardService] },
  {path: 'trabajador/pescado', component: PescadoComponent, canActivate: [AuthGuardService]},
  {path: 'trabajador/marisco', component: MariscoComponent, canActivate: [AuthGuardService]},
  {path: 'trabajador/productos', component: ProductosComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/proveedores', component: ProveedoresComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/categorias_usuarios', component: CategoriasUsuariosComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/usuarios', component: UsuariosComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/gastos', component: GastosComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/ventas', component: VentasComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/facturas', component: FacturasComponent, canActivate: [AuthGuardService]},
  {path: 'administrador/addFacturas', component: AddFacturaComponent, canActivate: [AuthGuardService]},
  { path: 'inicio', component: InicioComponent, data: { menuType: 'cliente' }, canActivate: [AuthGuardService] },
  { path: 'pescado', component: ListaPescadosComponent, data: { menuType: 'cliente' }, canActivate: [AuthGuardService]},
  { path: 'marisco', component: ListaMariscoComponent, data: { menuType: 'cliente' }, canActivate: [AuthGuardService]},
  { path: 'productos', component: ListaProductosComponent, data: { menuType: 'cliente' }, canActivate: [AuthGuardService]},
  { path: 'detalleProducto/:tipo/:id', component: DetalleProductoComponent, data: {menuType: 'cliente'}, canActivate: [AuthGuardService]},
  { path: 'carrito', component: CarritoComponent, data: {menuType: 'cliente'}, canActivate: [AuthGuardService]},
  { path: 'perfil', component:PerfilComponent, canActivate: [AuthGuardService]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
