import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { BDService } from '../service/bd';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
  standalone:false
})
export class InicioSesionPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private menu: MenuController,  
    private router: Router,
    private bdService: BDService,
    private authService: AuthService,
    private alertController: AlertController,
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['Usuario123', [Validators.required, Validators.minLength(3)]],
      contrasena: ['1234567890', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menu.enable(true);
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.value.usuario;
      const contrasena = this.loginForm.value.contrasena;
      console.log(usuario);
      console.log(contrasena);
  
      try {
        const usuarios = await this.bdService.obtenerUsuarios();
        console.log(usuarios);
        const usuarioEncontrado = usuarios.find(
          (u: any) => u.Nickname.trim() === usuario.trim() && u.Clave.toString() === contrasena.trim()
        );

        if (usuarioEncontrado) {
          await this.authService.guardarUsuario(usuarioEncontrado);
          this.router.navigate(['/home']);
        } else {
          // Mostrar alerta de error
          const alert = await this.alertController.create({
            header: 'Clave Incorrecta',
            message: 'Usuario o contraseña incorrectos.',
            buttons: ['OK']
          });
      
          await alert.present();
      
          // Redirigir al inicio de sesión después de cerrar la alerta
          alert.onDidDismiss().then(() => {
            this.router.navigate(['/iniciosesion']);
          });
        }
      } catch (error) {
        alert('Error al validar el usuario:' + error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }
  
  openMenu() {
    
  }
}