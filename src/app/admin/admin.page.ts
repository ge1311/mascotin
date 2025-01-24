import { Component, OnInit } from '@angular/core';
import { BDService } from '../service/bd'; // Asegúrate de importar el servicio desde la ruta correcta

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone:false
})
export class AdminPage implements OnInit {
  usuarios: any[] = [];  // Array para almacenar los usuarios

  constructor(private bdService: BDService) {}

  ngOnInit() {
    // Cargar los usuarios cuando la página se inicializa
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    // this.bdService.obtenerUsuarios().then((usuarios: any[]) => {
    //   this.usuarios = usuarios;  // Guardamos los usuarios obtenidos
    // }).catch((error: Error) => {
    //   console.log('Error al cargar los usuarios:', error);
    // });
  }
}
