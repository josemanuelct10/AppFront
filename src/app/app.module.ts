import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './InicioSesion/registro/registro.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { InicioSesionComponent } from './InicioSesion/inicio-sesion/inicio-sesion.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './Administrador/inicio/inicio.component';
import { PescadoComponent } from './Administrador/Pescado/pescado/pescado.component';
import { MenuDashboardComponent } from './Menus/menu-dashboard/menu-dashboard.component';
import { SeccionesComponent } from './ComponentesGenericos/secciones/secciones.component';
import { AddPescadoComponent } from './Modales/Pescado/add-pescado/add-pescado.component';
import { RmPescadoComponent } from './Modales/Pescado/rm-pescado/rm-pescado.component';
import { ShowPescadoComponent } from './Modales/Pescado/show-pescado/show-pescado.component';
import { EditPescadoComponent } from './Modales/Pescado/edit-pescado/edit-pescado.component';
import { MariscoComponent } from './Administrador/marisco/marisco.component';
import { AddMariscoComponent } from './Modales/Marisco/add-marisco/add-marisco.component';
import { RmMariscoComponent } from './Modales/Marisco/rm-marisco/rm-marisco.component';
import { ShowMariscoComponent } from './Modales/Marisco/show-marisco/show-marisco.component';
import { EditMariscoComponent } from './Modales/Marisco/edit-marisco/edit-marisco.component';
import { ProductosComponent } from './Administrador/productos/productos.component';
import { ProveedoresComponent } from './Administrador/proveedores/proveedores.component';
import { AddProveedorComponent } from './Modales/Proveedores/add-proveedor/add-proveedor.component';
import { RmProveedorComponent } from './Modales/Proveedores/rm-proveedor/rm-proveedor.component';
import { ShowProveedorComponent } from './Modales/Proveedores/show-proveedor/show-proveedor.component';
import { EditProveedorComponent } from './Modales/Proveedores/edit-proveedor/edit-proveedor.component';
import { CategoriasUsuariosComponent } from './Administrador/categorias-usuarios/categorias-usuarios.component';
import { AddCategoriaUsuariosComponent } from './Modales/Categorias-Usuarios/add-categoria-usuarios/add-categoria-usuarios.component';
import { RmCategoriasUsuariosComponent } from './Modales/Categorias-Usuarios/rm-categorias-usuarios/rm-categorias-usuarios.component';
import { UsuariosComponent } from './Administrador/usuarios/usuarios.component';
import { RmUsuarioComponent } from './Modales/Usuarios/rm-usuario/rm-usuario.component';
import { EditUsuarioComponent } from './Modales/Usuarios/edit-usuario/edit-usuario.component';
import { CleanupService } from './Services/cleanup.service';
import { provideToastr } from 'ngx-toastr';
import { MenuClienteComponent } from './Menus/menu-cliente/menu-cliente.component';
import { GastosComponent } from './Administrador/gastos/gastos.component';
import { AddNominaComponent } from './Modales/Gastos/add-nomina/add-nomina.component';
import { AddCompraComponent } from './Modales/Gastos/add-compra/add-compra.component';
import { AddGastosExtraComponent } from './Modales/Gastos/add-gastos-extra/add-gastos-extra.component';
import { RmGastoComponent } from './Modales/Gastos/rm-gasto/rm-gasto.component';
import { FilterPipe } from './Interfaces/Filtros';
import { ShowGastosComponent } from './Modales/Proveedores/show-gastos/show-gastos.component';
import { ShowNominasComponent } from './Modales/Usuarios/show-nominas/show-nominas.component';
import { VentasComponent } from './Administrador/ventas/ventas.component';
import { AddVentasComponent } from './Modales/Ventas/add-ventas/add-ventas.component';
import { RmVentasComponent } from './Modales/Ventas/rm-ventas/rm-ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InicioSesionComponent,
    InicioComponent,
    PescadoComponent,
    MenuDashboardComponent,
    SeccionesComponent,
    AddPescadoComponent,
    RmPescadoComponent,
    ShowPescadoComponent,
    EditPescadoComponent,
    MariscoComponent,
    AddMariscoComponent,
    RmMariscoComponent,
    ShowMariscoComponent,
    EditMariscoComponent,
    ProductosComponent,
    ProveedoresComponent,
    AddProveedorComponent,
    RmProveedorComponent,
    ShowProveedorComponent,
    EditProveedorComponent,
    CategoriasUsuariosComponent,
    AddCategoriaUsuariosComponent,
    RmCategoriasUsuariosComponent,
    UsuariosComponent,
    RmUsuarioComponent,
    EditUsuarioComponent,
    MenuClienteComponent,
    GastosComponent,
    AddNominaComponent,
    AddCompraComponent,
    AddGastosExtraComponent,
    RmGastoComponent,
    FilterPipe,
    ShowGastosComponent,
    ShowNominasComponent,
    VentasComponent,
    AddVentasComponent,
    RmVentasComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CleanupService,
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
