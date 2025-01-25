import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute, ) {}

    ionViewWillEnter(){
      console.log("ArticulosPage  ionViewWillEnter");
      this.sqlite.dbReady.subscribe(ready => {
        if (ready) {
          const idCategoria = Number(this.route.snapshot.paramMap.get('id'));
          //this.cargarArticulos();
          if (idCategoria) {
            this.filtrarPorCategoria(idCategoria);
          } else {
            console.log("No se recibió una categoría válida en la URL");
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
   
  
}
