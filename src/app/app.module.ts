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
import { RmPescadoComponent } from './modales/rm-pescado/rm-pescado.component';
import { ShowPescadoComponent } from './Modales/show-pescado/show-pescado.component';

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
    ShowPescadoComponent
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
