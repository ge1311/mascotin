import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router'; 

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
    private menu: MenuController,  private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menu.enable(true);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const usuarioControl = this.loginForm.get('usuario');
      if (usuarioControl) {
        const usuario = usuarioControl.value;
        // Verificar que el nombre de usuario sea válido
        if (usuario.length > 0) {
          // Mostrar un mensaje de bienvenida
          alert(`Bienvenido, ${usuario}!`);
          // Redirigir al usuario a la página de inicio después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        } else {
          // Mostrar un mensaje de error
          alert('El nombre de usuario no es válido');
        }
      }
    }
  }
  openMenu() {
    
  }
}