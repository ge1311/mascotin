import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SqliteService } from '../service/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  public language: string;
  public languages: string[];

  constructor(private menu: MenuController,
    private sqlite: SqliteService
  ) {
    this.language = '';
    this.languages = [];
    console.log("HomePage constructor");
  }

  ionViewWillEnter(){
    console.log("HomePage ionViewWillEnter");
    this.sqlite.dbReady.subscribe(ready => {
      if (ready) {
        this.read();
      } else {
        console.log("Base de datos aún no está lista");
      }
    });
    
  }
  create(){
    // Creamos un elemento en la base de datos
    this.sqlite.create(this.language.toUpperCase()).then( (changes) =>{
      console.log(changes);
      console.log("Creado");
      this.language = '';
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  read(){
    console.log("HomePage read");
    // Leemos los datos de la base de datos
    this.sqlite.read().then( (languages: string[]) => {
      this.languages = languages; 
      console.log("HomePage Leido");
      console.log(this.languages);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }
  
  update(language: string){
    // Actualizamos el elemento (language) por el nuevo elemento (this.language)
    this.sqlite.update(this.language.toUpperCase(), language).then( (changes) => {
      console.log(changes);
      console.log("Actualizado");
      this.language = '';
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al actualizar");
    })
  }

  delete(language: string){
    // Borramos el elemento
    this.sqlite.delete(language).then( (changes) => {
      console.log(changes);
      console.log("Borrado");
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al borrar");
    })
  }

  ngOnInit() {
    this.menu.enable(true);
  }

  openMenu() {
    this.menu.open();
  }
}