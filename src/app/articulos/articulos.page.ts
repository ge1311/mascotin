import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SqliteService } from '../service/sqlite.service';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, MatCardModule]
})
export class ArticulosPage {

  public articulos: any[] = [];

  constructor(private sqlite: SqliteService,
              private articulosService: ArticulosService,
              private route: ActivatedRoute, 
              private router: Router) {}

    ionViewWillEnter(){
      console.log("ArticulosPage  ionViewWillEnter");
      this.sqlite.dbReady.subscribe(ready => {
        if (ready) {
          const idCategoria = Number(this.route.snapshot.paramMap.get('id'));
          if (idCategoria) {
            this.filtrarPorCategoria(idCategoria);
          } else {
            this.cargarArticulos();
          }
        } else {
          console.log("Base de datos aún no está lista");
        }
      });  
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
  
  
}
