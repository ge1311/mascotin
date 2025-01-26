import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BDService } from '../service/bd';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone:false
})
export class RegistroPage {
  registerForm: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,  
    private router: Router  ,
    private bdService: BDService
  ) {
    this.registerForm = this.fb.group({
      nombres: ['', [Validators.required]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]+$')]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repetirClave: ['', [Validators.required]]
    }, {
      validator: this.matchingPasswords('clave', 'repetirClave')
    });
    
  }

  matchingPasswords(claveKey: string, repetirClaveKey: string) {
    return (group: FormGroup) => {
      const clave = group.controls[claveKey];
      const repetirClave = group.controls[repetirClaveKey];

      if (clave.value !== repetirClave.value) {
        repetirClave.setErrors({ mismatch: true });
      } else {
        repetirClave.setErrors(null);
      }
    };
  }

  async registrar() {
    this.formSubmitted = true;
  
    if (this.registerForm.valid) {
      const { nombres, nickname, correo, clave, telefono, fotoPerfil } = this.registerForm.value;
  
      // Llamar al servicio BD para insertar el usuario con todos los campos necesarios
      try {
        await this.bdService.insertarUsuario(
          nombres, 
          nickname, 
          correo, 
          clave, 
          telefono || null, 
          fotoPerfil || null, 
          false,  // Admin por defecto en true
          true   // Activo por defecto en true
        );
        console.log('Usuario registrado correctamente en la base de datos.');
      } catch (error) {
        console.log('Error al registrar el usuario:', error);
        return;
      }
  
      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: '¡Te has registrado correctamente!',
        buttons: ['OK']
      });
  
      await alert.present();
  
      // Redirigir al inicio de sesión después de cerrar la alerta
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/iniciosesion']);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
  
}
