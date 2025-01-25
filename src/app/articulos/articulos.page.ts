import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
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
              private articulosService: ArticulosService) {}

  ionViewWillEnter(){
    console.log("CategoriasPage ionViewWillEnter");
    this.sqlite.dbReady.subscribe(ready => {
      if (ready) {
        this.cargarArticulos();
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
}
