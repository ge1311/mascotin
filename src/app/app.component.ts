import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { MenuController, Platform } from '@ionic/angular';
import { SqliteService } from './service/sqlite.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false
})
export class AppComponent implements OnInit {
  public isWeb: boolean;
  public load: boolean;
  usuarioAutenticado = false;
  
  constructor(private menuCtrl: MenuController, 
              private platform: Platform,
              private sqlite: SqliteService,
              private authService: AuthService, 
              private router: Router) {
    this.isWeb = false;
    this.load = false;
    console.log("AppComponent constructor");
    this.initApp();
  }
  
  ngOnInit() {
    this.authService.usuarioAutenticado$.subscribe((autenticado) => {
      this.usuarioAutenticado = autenticado;
    });
    // Verifica si el usuario ya está autenticado al cargar la app
    this.authService.estaAutenticado();
  }

  async initApp(){
    console.log("AppComponent initApp");
    this.platform.ready().then( async () => {
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';
      console.log("AppComponent ready().then");
      this.sqlite.init();
      this.sqlite.dbReady.subscribe( load => {
        this.load = load;
        console.log("AppComponent load" + this.load);
      });
    })
    this.usuarioAutenticado = await this.authService.estaAutenticado();
    console.log('Autenticado: ' + this.usuarioAutenticado);
  }

  irPerfil() {
    this.router.navigate(['/perfilusuario']);
  }

  async cerrarSesion() {
    await this.authService.eliminarUsuario();
    this.authService.estaAutenticado(); // Actualizar el estado de autenticación
    this.router.navigate(['/iniciosesion']); // Redirigir a la página de inicio de sesión
  }
}