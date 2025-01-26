import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { SqliteService } from '../service/sqlite.service';
import { ArticulosService } from '../services/articulos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, MatCardModule]
})
export class ArticulosPage {

  public articulos: any[] = [];
  esAdmin: boolean = false;
  hasCategory: boolean = false; // Si entra por todos los articulos no puede crear xq no hay categoria

  constructor(private sqlite: SqliteService,
              private articulosService: ArticulosService,
              private route: ActivatedRoute, 
              private router: Router,
              private alertController: AlertController,
              private authService: AuthService) {}

  ionViewWillEnter(){
    console.log("ArticulosPage  ionViewWillEnter");
    this.sqlite.dbReady.subscribe(ready => {
      if (ready) {
        const idCategoria = Number(this.route.snapshot.paramMap.get('id'));
        if (idCategoria) {
          this.filtrarPorCategoria(idCategoria);
          this.hasCategory = true;
        } else {
          this.cargarArticulos();
        }
        this.verificarAdmin();
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


  async cargarArticulos() {
    try {
      this.articulos = await this.articulosService.obtenerTodosLosArticulos();
    } catch (error) {
      console.error('Error al cargar artículos:', error);
    }
  }

  filtrarPorCategoria(idCategoria: number) {
    this.articulosService.obtenerTodosLosArticulos().then(articulos => {
      this.articulos = articulos.filter(articulo => articulo.Id_Categoria === idCategoria);
    }).catch(error => {
      console.error('Error al filtrar artículos:', error);
    });
  }

  AgregarArticulo() {
    const idCategoria = this.route.snapshot.paramMap.get('id');  // Obtener ID de la URL actual
    this.router.navigate(['/crud-articulos'], {
      state: { categoriaId: idCategoria }
    });
  }

  editarArticulo(articuloId: number) {
    this.router.navigate(['/crud-articulos'], { state: { articuloId: articuloId } });
  }

  async eliminarArticulo(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este artículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              const result = await this.articulosService.eliminarArticulo(id);
              if (result.changes && result.changes.changes > 0) {
                this.articulos = this.articulos.filter(c => c.Id !== id);
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
