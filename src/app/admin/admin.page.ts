import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(private bdService: BDService, 
              private sqlite: SqliteService,
              private alertController: AlertController) {}

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

  async eliminarUsuario(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: 'Eliminarás todos los posts asociados a este usuario. ¿Deseas continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const mensaje = await this.bdService.eliminarUsuario(id);
            console.log(mensaje);
            this.cargarUsuarios();  // Recargar la lista de usuarios después de eliminar
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  
}
