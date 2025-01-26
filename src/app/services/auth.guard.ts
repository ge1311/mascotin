import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const usuario = await this.authService.obtenerUsuario();
    if (usuario) {
      this.router.navigate(['/home']);
      return false;
    } else {
      this.router.navigate(['/iniciosesion']);
      return false;
    }
  }
}
