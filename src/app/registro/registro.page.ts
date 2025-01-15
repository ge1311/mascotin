import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup = this.formBuilder.group({ 
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });

  RegistroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private menu: MenuController, private router: Router) {
    this.registroForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.RegistroForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    console.log('RegistroPage inicializado');
  }

  openMenu() {
    this.menu.open();
  }

  onRegistro() {
  
  }}