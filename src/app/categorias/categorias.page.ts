import { Component } from '@angular/core';
import { SqliteService } from '../service/sqlite.service';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone:false
})
export class CategoriasPage {
  public categoria: string;
  //public categorias: string[];
  
    public categorias: { 
    Id: number, 
    Titulo: string, 
    Descripcion: string, 
    Boton: string, 
    Imagen?: string, 
    Activo: boolean, 
    Fecha: string 
    }[] = [];
  

  constructor(private sqlite: SqliteService,
    private categoryService: CategoryService
    ) {
      this.categoria = '';
      this.categorias = [];
      console.log("CategoriasPage constructor");
    }
  
    ionViewWillEnter(){
      console.log("CategoriasPage ionViewWillEnter");
      this.sqlite.dbReady.subscribe(ready => {
        if (ready) {
          this.read();
        } else {
          console.log("Base de datos aún no está lista");
        }
      });  
    }

    read(){
      console.log("CategoriasPage read");
      // Leemos los datos de la base de datos
      this.categoryService.read().then( (result: any[]) => {
        this.categorias = result; 
        console.log("CategoriasPage Leido");
        console.log(this.categorias);
      }).catch(err => {
        console.error(err);
        console.error("Error al leer");
      })
    }
}
