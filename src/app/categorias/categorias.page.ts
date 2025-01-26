import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SqliteService } from '../service/sqlite.service';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone:false
})
export class CategoriasPage {
  public categoria: string;
  esAdmin: boolean = false;
  
  public categorias: { 
    Id: number, 
    Titulo: string, 
    Descripcion: string, 
    Boton: string, 
    Imagen?: string, 
    Url: string,
    Activo: boolean, 
    Fecha: string 
  }[] = [];
  
  constructor(private sqlite: SqliteService,
              private categoryService: CategoryService,
              private alertController: AlertController,
              private authService: AuthService 
    ) {
      this.categoria = '';
      this.categorias = [];
      console.log("CategoriasPage constructor");
    }
  
    ionViewWillEnter(){
      console.log("CategoriasPage ionViewWillEnter");
      this.sqlite.dbReady.subscribe(ready => {
        if (ready) {
          this.verificarAdmin();
          this.read();
        } else {
          console.log("Base de datos aún no está lista");
        }
      });  
    }

    async verificarAdmin() {
      try {
        const esAdminResult = await this.authService.esUsuarioAdmin();
        this.esAdmin = Boolean(esAdminResult); // Asegura conversión explícita a booleano
        console.log('this.esAdmin:', this.esAdmin);
      } catch (error) {
        console.error("Error al verificar admin o cargar datos:", error);
      }
    }
    

    read(){
      console.log("CategoriasPage read");
      // Leemos los datos de la base de datos
      this.categoryService.cargarListado().then( (result: any[]) => {
        this.categorias = result; 
        console.log("CategoriasPage Leido");
        console.log(this.categorias);
      }).catch(err => {
        console.error(err);
        console.error("Error al leer");
      })
    }

    async eliminarCategoria(id: number) {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que deseas eliminar esta categoría?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: async () => {
              try {
                const result = await this.categoryService.eliminarCategoria(id);
                if (result.changes && result.changes.changes > 0) {
                  this.categorias = this.categorias.filter(c => c.Id !== id);
                } else {
                  console.log('No se pudo eliminar la categoría');
                }
              } catch (error) {
                console.error('Error al eliminar la categoría:', error);
              }
            },
          },
        ],
      });
    
      await alert.present();
    }
    
}
