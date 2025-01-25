import { Component } from '@angular/core';
import { BDService } from '../service/bd'; // Asegúrate de importar el servicio desde la ruta correcta
import { SqliteService } from '../service/sqlite.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone:false
})
export class AdminPage  {
  usuarios: any[] = [];  // Array para almacenar los usuarios

  constructor(private bdService: BDService, private sqlite: SqliteService) {}

  ionViewWillEnter(){
    console.log("AdminPage ionViewWillEnter");
    this.sqlite.dbReady.subscribe(ready => {
      if (ready) {
        this.cargarUsuarios();
      } else {
        console.log("Base de datos aún no está lista");
      }
    });  
  }

  cargarUsuarios() {
    this.bdService.obtenerUsuarios().then((usuarios: any[]) => {
      console.log('Usuarios cargados:', usuarios);
      this.usuarios = usuarios;
    }).catch((error: Error) => {
      console.error('Error al cargar los usuarios:', error);
    });
    
  }
}
