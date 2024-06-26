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
import { InicioComponent } from './ComponentesGenericos/inicio/inicio.component';
import { PescadoComponent } from './Administrador/Pescado/pescado/pescado.component';
import { MenuDashboardComponent } from './Menus/menu-dashboard/menu-dashboard.component';
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
import { provideToastr } from 'ngx-toastr';
import { MenuClienteComponent } from './Menus/menu-cliente/menu-cliente.component';
import { GastosComponent } from './Administrador/gastos/gastos.component';
import { AddNominaComponent } from './Modales/Gastos/add-nomina/add-nomina.component';
import { AddCompraComponent } from './Modales/Gastos/add-compra/add-compra.component';
import { AddGastosExtraComponent } from './Modales/Gastos/add-gastos-extra/add-gastos-extra.component';
import { RmGastoComponent } from './Modales/Gastos/rm-gasto/rm-gasto.component';
import { FiltroGastos } from './Interfaces/filtroGastos';
import { FiltroFacturas } from './Interfaces/filtroFacturas';
import { FiltroUsuarios } from './Interfaces/filtroUsuarios';
import { FilterVentas } from './Interfaces/filtroVentas';
import { FiltroProductos } from './Interfaces/filtroProductos';
import { VentasComponent } from './Administrador/ventas/ventas.component';
import { AddVentasComponent } from './Modales/Ventas/add-ventas/add-ventas.component';
import { RmVentasComponent } from './Modales/Ventas/rm-ventas/rm-ventas.component';
import { FacturasComponent } from './Administrador/facturas/facturas.component';
import { AddLineaComponent } from './Modales/Facturas/add-linea/add-linea.component';
import { AddFacturaComponent } from './Administrador/add-factura/add-factura.component';
import { RmFacturaComponent } from './Modales/Facturas/rm-factura/rm-factura.component';
import { AddUsuarioComponent } from './Modales/Usuarios/add-usuario/add-usuario.component';
import { ListaPescadosComponent } from './Clientes/lista-pescados/lista-pescados.component';
import { CardProductoComponent } from './ComponentesGenericos/card-producto/card-producto.component';
import { FooterComponent } from './ComponentesGenericos/footer/footer.component';
import { ListaMariscoComponent } from './Clientes/lista-marisco/lista-marisco.component';
import { ListaProductosComponent } from './Clientes/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './ComponentesGenericos/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './Clientes/carrito/carrito.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PerfilComponent } from './ComponentesGenericos/perfil/perfil.component';
import { UpdtUsuarioComponent } from './Modales/Usuarios/updt-usuario/updt-usuario.component';
import { UpdtPwdComponent } from './Modales/Usuarios/updt-pwd/updt-pwd.component';
import { FiltroCategoriaPipe } from './Interfaces/FiltroCategoria';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltroProveedores } from './Interfaces/filtroProveedores';
import { FinalizarCompraComponent } from './Clientes/finalizar-compra/finalizar-compra.component';
import { RecuperarPwdComponent } from './InicioSesion/recuperar-pwd/recuperar-pwd.component';
import { ChangePwdComponent } from './ComponentesGenericos/change-pwd/change-pwd.component';
import { FacturasUsuarioComponent } from './Clientes/facturas-usuario/facturas-usuario.component';
import { BuscadorComponent } from './Clientes/buscador/buscador.component';
import { SlideComponent } from './ComponentesGenericos/slide/slide.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InicioSesionComponent,
    InicioComponent,
    PescadoComponent,
    MenuDashboardComponent,
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
    FiltroProductos,
    AddCompraComponent,
    AddGastosExtraComponent,
    RmGastoComponent,
    FiltroGastos,
    FilterVentas,
    FiltroFacturas,
    FiltroUsuarios,
    FiltroProveedores,
    FiltroCategoriaPipe,
    VentasComponent,
    AddVentasComponent,
    RmVentasComponent,
    FacturasComponent,
    AddLineaComponent,
    AddFacturaComponent,
    RmFacturaComponent,
    AddUsuarioComponent,
    ListaPescadosComponent,
    CardProductoComponent,
    FooterComponent,
    ListaMariscoComponent,
    ListaProductosComponent,
    DetalleProductoComponent,
    CarritoComponent,
    PerfilComponent,
    UpdtUsuarioComponent,
    UpdtPwdComponent,
    FinalizarCompraComponent,
    RecuperarPwdComponent,
    ChangePwdComponent,
    FacturasUsuarioComponent,
    BuscadorComponent,
    SlideComponent,

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(), // Agrega el módulo de modales aquí
    NgxPaginationModule,
    NgbModalModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
