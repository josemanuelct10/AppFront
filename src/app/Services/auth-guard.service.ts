import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { InicioSesionService } from './inicio-sesion.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private inicioSesionService: InicioSesionService,
    private router: Router,
    private toast: ToastrService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Obtenemos la URL solicitada
    const requestedUrl = state.url;

    // Verificamos si la URL solicitada comienza con '/trabajador'
    if (requestedUrl.startsWith('/trabajador')) {
      // Verificamos si la categoría del usuario es 1 (administrador) o 3 (trabajador)
      if (this.inicioSesionService.getCategoriaUsuario() === '1' || this.inicioSesionService.getCategoriaUsuario() === '3') {
        // Si la categoría del usuario es 1 o 3, permitimos el acceso
        return true;
      } else {
        // Si no es 1 ni 3, redirigimos al usuario a la página de inicio y mostramos un mensaje de error
        if (this.inicioSesionService.isLoggedIn()){
          this.toast.error("No tiene permiso para acceder a esta página.", "Error");
        }
        this.router.navigate(['inicio']);
        return false;
      }
    }

    // Verificamos si la URL solicitada comienza con '/administrador'
    if (requestedUrl.startsWith('/administrador')) {
      // Verificamos si la categoría del usuario es 1 (administrador)
      if (this.inicioSesionService.getCategoriaUsuario() === '1') {
        // Si la categoría del usuario es 1, permitimos el acceso
        return true;
      } else if (this.inicioSesionService.getCategoriaUsuario() === '3') {
        // Si la categoría del usuario es 3, lo redirigimos a '/trabajador/inicio'
        this.router.navigate(['trabajador/inicio']);
        this.toast.error("No tienes permiso para entrar a ese sitio!", "Error!");
        return false;
      } else {
        // Si no es 1 ni 3, redirigimos al usuario a la página de inicio y mostramos un mensaje de error
        if (this.inicioSesionService.isLoggedIn()){
          this.toast.error("No tiene permiso para acceder a esta página.", "Error");
        }
        this.router.navigate(['inicio']);
        return false;
      }
    }

    // Para otras rutas, simplemente verificamos si el usuario ha iniciado sesión
    if (this.inicioSesionService.isLoggedIn()) {
      return true;
    } else {
      // Si el usuario no ha iniciado sesión, redirigimos al usuario a la página de inicio y mostramos un mensaje de error
      this.router.navigate(['']);
      this.toast.error("No ha iniciado sesión.", "Error");
      return false;
    }
  }


}
