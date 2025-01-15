import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
  standalone:false
})
export class PerfilusuarioPage implements OnInit {
 
  userData = {
    username: 'UsuarioDemo', 
    email: 'usuario@ejemplo.com', 
    phone: '123-456-7890', 
  };

  constructor() {}

  ngOnInit() {}
}
