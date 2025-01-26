import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
  standalone:false
})
export class PerfilusuarioPage implements OnInit {
 
  userData: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    try {
      this.userData = await this.authService.obtenerUsuario();
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }
}
