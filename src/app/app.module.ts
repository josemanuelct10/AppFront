import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './InicioSesion/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { InicioSesionComponent } from './InicioSesion/inicio-sesion/inicio-sesion.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './Administrador/inicio/inicio.component';
import { PescadoComponent } from './Administrador/Pescado/pescado/pescado.component';
import { MenuDashboardComponent } from './Menus/menu-dashboard/menu-dashboard.component';
import { SeccionesComponent } from './ComponentesGenericos/secciones/secciones.component';
import { AddPescadoComponent } from './Modales/add-pescado/add-pescado.component';
import { RmPescadoComponent } from './Modales/rm-pescado/rm-pescado.component';
import { ShowPescadoComponent } from './Modales/show-pescado/show-pescado.component';
import { EditPescadoComponent } from './Modales/edit-pescado/edit-pescado.component';
import { MariscoComponent } from './Administrador/marisco/marisco.component';
import { AddMariscoComponent } from './Modales/add-marisco/add-marisco.component';
import { RmMariscoComponent } from './Modales/rm-marisco/rm-marisco.component';
import { ShowMariscoComponent } from './Modales/show-marisco/show-marisco.component';
import { EditMariscoComponent } from './Modales/edit-marisco/edit-marisco.component';
import { ProductosComponent } from './Administrador/productos/productos.component';
import { ProveedoresComponent } from './Administrador/proveedores/proveedores.component';
import { AddProveedorComponent } from './Modales/add-proveedor/add-proveedor.component';
import { RmProveedorComponent } from './Modales/rm-proveedor/rm-proveedor.component';
import { ShowProveedorComponent } from './Modales/show-proveedor/show-proveedor.component';
import { EditProveedorComponent } from './Modales/edit-proveedor/edit-proveedor.component';

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
    EditProveedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
